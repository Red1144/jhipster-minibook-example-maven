package org.jhipster.health.web.rest;

import org.jhipster.health.TwentyOnePointsApp;

import org.jhipster.health.domain.Weights;
import org.jhipster.health.repository.WeightsRepository;
import org.jhipster.health.repository.search.WeightsSearchRepository;
import org.jhipster.health.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static org.jhipster.health.web.rest.TestUtil.sameInstant;
import static org.jhipster.health.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the WeightsResource REST controller.
 *
 * @see WeightsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TwentyOnePointsApp.class)
public class WeightsResourceIntTest {

    private static final ZonedDateTime DEFAULT_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_WEIGHT = 1;
    private static final Integer UPDATED_WEIGHT = 2;

    @Autowired
    private WeightsRepository weightsRepository;

    @Autowired
    private WeightsSearchRepository weightsSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWeightsMockMvc;

    private Weights weights;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WeightsResource weightsResource = new WeightsResource(weightsRepository, weightsSearchRepository);
        this.restWeightsMockMvc = MockMvcBuilders.standaloneSetup(weightsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Weights createEntity(EntityManager em) {
        Weights weights = new Weights()
            .time(DEFAULT_TIME)
            .weight(DEFAULT_WEIGHT);
        return weights;
    }

    @Before
    public void initTest() {
        weightsSearchRepository.deleteAll();
        weights = createEntity(em);
    }

    @Test
    @Transactional
    public void createWeights() throws Exception {
        int databaseSizeBeforeCreate = weightsRepository.findAll().size();

        // Create the Weights
        restWeightsMockMvc.perform(post("/api/weights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(weights)))
            .andExpect(status().isCreated());

        // Validate the Weights in the database
        List<Weights> weightsList = weightsRepository.findAll();
        assertThat(weightsList).hasSize(databaseSizeBeforeCreate + 1);
        Weights testWeights = weightsList.get(weightsList.size() - 1);
        assertThat(testWeights.getTime()).isEqualTo(DEFAULT_TIME);
        assertThat(testWeights.getWeight()).isEqualTo(DEFAULT_WEIGHT);

        // Validate the Weights in Elasticsearch
        Weights weightsEs = weightsSearchRepository.findOne(testWeights.getId());
        assertThat(testWeights.getTime()).isEqualTo(testWeights.getTime());
        assertThat(weightsEs).isEqualToIgnoringGivenFields(testWeights, "time");
    }

    @Test
    @Transactional
    public void createWeightsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = weightsRepository.findAll().size();

        // Create the Weights with an existing ID
        weights.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWeightsMockMvc.perform(post("/api/weights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(weights)))
            .andExpect(status().isBadRequest());

        // Validate the Weights in the database
        List<Weights> weightsList = weightsRepository.findAll();
        assertThat(weightsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = weightsRepository.findAll().size();
        // set the field null
        weights.setTime(null);

        // Create the Weights, which fails.

        restWeightsMockMvc.perform(post("/api/weights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(weights)))
            .andExpect(status().isBadRequest());

        List<Weights> weightsList = weightsRepository.findAll();
        assertThat(weightsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllWeights() throws Exception {
        // Initialize the database
        weightsRepository.saveAndFlush(weights);

        // Get all the weightsList
        restWeightsMockMvc.perform(get("/api/weights?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(weights.getId().intValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(sameInstant(DEFAULT_TIME))))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT)));
    }

    @Test
    @Transactional
    public void getWeights() throws Exception {
        // Initialize the database
        weightsRepository.saveAndFlush(weights);

        // Get the weights
        restWeightsMockMvc.perform(get("/api/weights/{id}", weights.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(weights.getId().intValue()))
            .andExpect(jsonPath("$.time").value(sameInstant(DEFAULT_TIME)))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT));
    }

    @Test
    @Transactional
    public void getNonExistingWeights() throws Exception {
        // Get the weights
        restWeightsMockMvc.perform(get("/api/weights/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWeights() throws Exception {
        // Initialize the database
        weightsRepository.saveAndFlush(weights);
        weightsSearchRepository.save(weights);
        int databaseSizeBeforeUpdate = weightsRepository.findAll().size();

        // Update the weights
        Weights updatedWeights = weightsRepository.findOne(weights.getId());
        // Disconnect from session so that the updates on updatedWeights are not directly saved in db
        em.detach(updatedWeights);
        updatedWeights
            .time(UPDATED_TIME)
            .weight(UPDATED_WEIGHT);

        restWeightsMockMvc.perform(put("/api/weights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWeights)))
            .andExpect(status().isOk());

        // Validate the Weights in the database
        List<Weights> weightsList = weightsRepository.findAll();
        assertThat(weightsList).hasSize(databaseSizeBeforeUpdate);
        Weights testWeights = weightsList.get(weightsList.size() - 1);
        assertThat(testWeights.getTime()).isEqualTo(UPDATED_TIME);
        assertThat(testWeights.getWeight()).isEqualTo(UPDATED_WEIGHT);

        // Validate the Weights in Elasticsearch
        Weights weightsEs = weightsSearchRepository.findOne(testWeights.getId());
        assertThat(testWeights.getTime()).isEqualTo(testWeights.getTime());
        assertThat(weightsEs).isEqualToIgnoringGivenFields(testWeights, "time");
    }

    @Test
    @Transactional
    public void updateNonExistingWeights() throws Exception {
        int databaseSizeBeforeUpdate = weightsRepository.findAll().size();

        // Create the Weights

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWeightsMockMvc.perform(put("/api/weights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(weights)))
            .andExpect(status().isCreated());

        // Validate the Weights in the database
        List<Weights> weightsList = weightsRepository.findAll();
        assertThat(weightsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteWeights() throws Exception {
        // Initialize the database
        weightsRepository.saveAndFlush(weights);
        weightsSearchRepository.save(weights);
        int databaseSizeBeforeDelete = weightsRepository.findAll().size();

        // Get the weights
        restWeightsMockMvc.perform(delete("/api/weights/{id}", weights.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean weightsExistsInEs = weightsSearchRepository.exists(weights.getId());
        assertThat(weightsExistsInEs).isFalse();

        // Validate the database is empty
        List<Weights> weightsList = weightsRepository.findAll();
        assertThat(weightsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchWeights() throws Exception {
        // Initialize the database
        weightsRepository.saveAndFlush(weights);
        weightsSearchRepository.save(weights);

        // Search the weights
        restWeightsMockMvc.perform(get("/api/_search/weights?query=id:" + weights.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(weights.getId().intValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(sameInstant(DEFAULT_TIME))))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Weights.class);
        Weights weights1 = new Weights();
        weights1.setId(1L);
        Weights weights2 = new Weights();
        weights2.setId(weights1.getId());
        assertThat(weights1).isEqualTo(weights2);
        weights2.setId(2L);
        assertThat(weights1).isNotEqualTo(weights2);
        weights1.setId(null);
        assertThat(weights1).isNotEqualTo(weights2);
    }
}
