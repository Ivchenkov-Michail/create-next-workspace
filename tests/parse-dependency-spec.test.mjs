import assert from 'node:assert/strict';
import { test } from 'node:test';

import { parseDependencySpec }
    from '../dist/lib/parse-dependency-spec.js';

test('parseDependencySpec handles scoped packages', () => {
    assert.deepEqual(
        parseDependencySpec('@svgr/webpack'),
        { name: '@svgr/webpack', version: 'latest' }
    );

    assert.deepEqual(
        parseDependencySpec('husky@9'),
        { name: 'husky', version: '^9' }
    );

    assert.deepEqual(
        parseDependencySpec('lint-staged@15'),
        { name: 'lint-staged', version: '^15' }
    );
});
