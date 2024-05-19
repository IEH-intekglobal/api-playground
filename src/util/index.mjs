export function radians(degrees) {
    assert('number' === typeof degrees, 'Degrees must be a number');
    return degrees * (Math.PI / 180);
}

export function degrees(radians) {
    assert('number' === typeof radians, 'Radians must be a number')
    return radians * (180 / Math.PI);
}

export function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}