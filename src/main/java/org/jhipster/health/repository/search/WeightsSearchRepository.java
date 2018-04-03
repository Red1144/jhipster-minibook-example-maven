package org.jhipster.health.repository.search;

import org.jhipster.health.domain.Weights;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Weights entity.
 */
public interface WeightsSearchRepository extends ElasticsearchRepository<Weights, Long> {
}
