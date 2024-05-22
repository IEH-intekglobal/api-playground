'use strict';
import { Op } from 'sequelize';
import { radians, degrees } from '../../../util/index.mjs';

const earthRadius = 6371000; // m

// find nearby stores in a rough "square" radius
export default async function findNearby({ params, app }) {
  let q = params.query;

  if (!q.near) return;

  let miles = q.miles || 10;
  let radiusInMeters = Number(miles) * 1609;

  const { zipcode } = app.get('sequelizeClient').models;

  const { lat, lng } = await zipcode.findById(q.near)

  let north = calcDerivedLatitude(lat, radiusInMeters, 0);
  let east = calcDerivedPosition(lat, lng, radiusInMeters, 90);
  let south = calcDerivedLatitude(lat, radiusInMeters, 180);
  let west = calcDerivedPosition(lat, lng, radiusInMeters, 270);

  q.lat = {
    [Op.lt]: north,
    [Op.gt]: south
  };
  q.lng = {
    [Op.lt]: east.lng,
    [Op.gt]: west.lng
  };

  delete q.near;
  delete q.miles;

}

function calcDerivedPosition(lat, lng, range, bearing) {
  let latA = radians(lat);
  let lngA = radians(lng);
  let angularDistance = range / earthRadius;
  let trueCourse = radians(bearing);

  let destLat = Math.asin(
    Math.sin(latA) * Math.cos(angularDistance) +
    Math.cos(latA) * Math.sin(angularDistance) * Math.cos(trueCourse)
  );

  let destDLng = Math.atan2(
    Math.sin(trueCourse) * Math.sin(angularDistance) * Math.cos(latA),
    Math.cos(angularDistance) - Math.sin(latA) * Math.sin(lat)
  );

  let destLng = ((lngA + destDLng + Math.PI) % (Math.PI * 2)) - Math.PI;

  return {
    lat: degrees(destLat),
    lng: degrees(destLng)
  };
}

function calcDerivedLatitude(lat, range, bearing) {
  let latA = radians(lat);
  let angularDistance = range / earthRadius;
  let trueCourse = radians(bearing);

  let destLat = Math.asin(
    Math.sin(latA) * Math.cos(angularDistance) +
    Math.cos(latA) * Math.sin(angularDistance) * Math.cos(trueCourse)
  );

  return degrees(destLat);
}
