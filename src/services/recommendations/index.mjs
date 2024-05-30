'use strict';

import { RecommendationService } from './recommendation.service.mjs';
import { before, after, around } from './hooks/index.mjs';

export default function () {
    const app = this;

    app.use('/recommender/v0/unified/site/dotcom-l/placement/d4u', new RecommendationService());

    const recommendationService = app.service('/recommender/v0/unified/site/dotcom-l/placement/d4u');

    recommendationService.hooks({
        around,
        before,
        after,        
    });
}

