import test from 'node:test';
import assert from 'node:assert/strict';
import { SERVICE_CLUSTERS, PRIMARY_NAV_LINKS } from '../Navbar';

test('Navbar: Mega-menu contains exactly 3 canonical clusters', () => {
  assert.equal(SERVICE_CLUSTERS.length, 3);
  const clusterIds = SERVICE_CLUSTERS.map(c => c.id);
  assert.deepEqual(clusterIds, ['advisory', 'design-services', 'search-automation']);
});

test('Navbar: Mega-menu contains exactly 18 canonical services (6 per cluster)', () => {
  let totalServices = 0;
  for (const cluster of SERVICE_CLUSTERS) {
    assert.equal(cluster.services.length, 6, `Cluster ${cluster.name} must have 6 services`);
    totalServices += cluster.services.length;
    for (const service of cluster.services) {
      assert.ok(service.title.length > 0, 'Service title must not be empty');
      assert.ok(service.href.startsWith(cluster.slug), `Service href ${service.href} must start with cluster slug ${cluster.slug}`);
    }
  }
  assert.equal(totalServices, 18);
});

test('Navbar: Advisory is removed from top-level and belongs inside Services mega-menu', () => {
  const topLevelHrefs = PRIMARY_NAV_LINKS.map(l => l.href);
  assert.ok(!topLevelHrefs.includes('/advisory'), 'Advisory must NOT be a top-level nav link');
  assert.ok(!topLevelHrefs.includes('/design-services'), 'Design Services must NOT be a top-level nav link');
  assert.ok(!topLevelHrefs.includes('/search-automation'), 'Search & Automation must NOT be a top-level nav link');
});

test('Navbar: Primary nav links contain expected commercial and brand links', () => {
  const expected = ['/pricing', '/how-we-work', '/evidence', '/audit', '/knowledge', '/founder'];
  const topLevelHrefs = PRIMARY_NAV_LINKS.map(l => l.href);
  assert.deepEqual(topLevelHrefs, expected);
});

test('Navbar: Hindi language selector is absent from primary navigation', () => {
  const topLevelHrefs = PRIMARY_NAV_LINKS.map(l => l.href);
  assert.ok(!topLevelHrefs.includes('/hi'), 'Hindi route must NOT be in primary nav links');
  for (const cluster of SERVICE_CLUSTERS) {
    for (const service of cluster.services) {
      assert.ok(!service.href.includes('/hi'), 'No service link may point to /hi');
    }
  }
});
