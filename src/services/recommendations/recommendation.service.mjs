import { BadRequest } from '@feathersjs/errors';
import recommendations from './index.mjs';
export class RecommendationService {
    async find(params, ctx) {
        console.log('query', params.query);
        const { vt, subplmts, pageSize } = params.query;

        // TODO add more validation for subplmts and vt format
        if (!vt || !subplmts || !pageSize) throw new BadRequest('Error');
        // check if user is logged in or not based on vt format
        return {
            [subplmts]: {  // monitor: 1507078
                id: vt,
                title: "Trending member deals",
                recommendations: [
                    ...(["2484735", "1902078", "1162041", "1507078", "4628500", "4554929"]).map((id, idx) => ({ id, rank: idx + 1, type: "SKU", tags: {} }))
                ]
            }
        }
    }
}

// https://context.bestbuy.com/api/recommender/v2/unified/site/dotcom-l/placement/d4u?pageSize=6&vt=08b2b8a6-1154-11ef-b0b3-0e75e756f081&subplmts=a914aec6-4e45-4f3a-8797-18ac542305f1
// https://context.bestbuy.com/api/recommender/v2/unified/site/dotcom-l/placement/tt-dashboard?pageSize=5&effectivePlanPaidMemberType=PLAN_PAID_MEMBER_2&ut=d41e4a1f-1182-11ef-82bf-0ea1f63cd017&vt=08b2b8a6-1154-11ef-b0b3-0e75e756f081

/*
?pageSize=6
vt=08b2b8a6-1154-11ef-b0b3-0e75e756f081 // id
subplmts=a914aec6-4e45-4f3a-8797-18ac542305f1 // propValue

// when logged in:
"id": "pcmcat250300050008~member2",
        "title": "Trending member deals",

// when not logged in:
 "id": "08b2b8a6-1154-11ef-b0b3-0e75e756f081",
        "title": "Deals inspired by your shopping",
*/