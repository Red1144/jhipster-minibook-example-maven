package org.jhipster.health.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.health.domain.Weights;

import org.jhipster.health.repository.WeightsRepository;
import org.jhipster.health.repository.search.WeightsSearchRepository;
import org.jhipster.health.web.rest.errors.BadRequestAlertException;
import org.jhipster.health.web.rest.util.HeaderUtil;
import org.jhipster.health.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Weights.
 */
@RestController
@RequestMapping("/api")
public class WeightsResource {

    private final Logger log = LoggerFactory.getLogger(WeightsResource.class);

    private static final String ENTITY_NAME = "weights";

    private final WeightsRepository weightsRepository;

    private final WeightsSearchRepository weightsSearchRepository;

    public WeightsResource(WeightsRepository weightsRepository, WeightsSearchRepository weightsSearchRepository) {
        this.weightsRepository = weightsRepository;
        this.weightsSearchRepository = weightsSearchRepository;
    }

    /**
     * POST  /weights : Create a new weights.
     *
     * @param weights the weights to create
     * @return the ResponseEntity with status 201 (Created) and with body the new weights, or with status 400 (Bad Request) if the weights has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/weights")
    @Timed
    public ResponseEntity<Weights> createWeights(@Valid @RequestBody Weights weights) throws URISyntaxException {
        log.debug("REST request to save Weights : {}", weights);
        if (weights.getId() != null) {
            throw new BadRequestAlertException("A new weights cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Weights result = weightsRepository.save(weights);
        weightsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/weights/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /weights : Updates an existing weights.
     *
     * @param weights the weights to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated weights,
     * or with status 400 (Bad Request) if the weights is not valid,
     * or with status 500 (Internal Server Error) if the weights couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/weights")
    @Timed
    public ResponseEntity<Weights> updateWeights(@Valid @RequestBody Weights weights) throws URISyntaxException {
        log.debug("REST request to update Weights : {}", weights);
        if (weights.getId() == null) {
            return createWeights(weights);
        }
        Weights result = weightsRepository.save(weights);
        weightsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, weights.getId().toString()))
            .body(result);
    }

    /**
     * GET  /weights : get all the weights.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of weights in body
     */
    @GetMapping("/weights")
    @Timed
    public ResponseEntity<List<Weights>> getAllWeights(Pageable pageable) {
        log.debug("REST request to get a page of Weights");
        Page<Weights> page = weightsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/weights");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /weights/:id : get the "id" weights.
     *
     * @param id the id of the weights to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the weights, or with status 404 (Not Found)
     */
    @GetMapping("/weights/{id}")
    @Timed
    public ResponseEntity<Weights> getWeights(@PathVariable Long id) {
        log.debug("REST request to get Weights : {}", id);
        Weights weights = weightsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(weights));
    }

    /**
     * DELETE  /weights/:id : delete the "id" weights.
     *
     * @param id the id of the weights to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/weights/{id}")
    @Timed
    public ResponseEntity<Void> deleteWeights(@PathVariable Long id) {
        log.debug("REST request to delete Weights : {}", id);
        weightsRepository.delete(id);
        weightsSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/weights?query=:query : search for the weights corresponding
     * to the query.
     *
     * @param query the query of the weights search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/weights")
    @Timed
    public ResponseEntity<List<Weights>> searchWeights(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Weights for query {}", query);
        Page<Weights> page = weightsSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/weights");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
