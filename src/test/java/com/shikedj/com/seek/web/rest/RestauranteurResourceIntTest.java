package com.shikedj.com.seek.web.rest;

import com.shikedj.com.seek.SeekApp;

import com.shikedj.com.seek.domain.Restauranteur;
import com.shikedj.com.seek.repository.RestauranteurRepository;
import com.shikedj.com.seek.web.rest.errors.ExceptionTranslator;

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
import java.util.List;


import static com.shikedj.com.seek.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RestauranteurResource REST controller.
 *
 * @see RestauranteurResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeekApp.class)
public class RestauranteurResourceIntTest {

    @Autowired
    private RestauranteurRepository restauranteurRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRestauranteurMockMvc;

    private Restauranteur restauranteur;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RestauranteurResource restauranteurResource = new RestauranteurResource(restauranteurRepository);
        this.restRestauranteurMockMvc = MockMvcBuilders.standaloneSetup(restauranteurResource)
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
    public static Restauranteur createEntity(EntityManager em) {
        Restauranteur restauranteur = new Restauranteur();
        return restauranteur;
    }

    @Before
    public void initTest() {
        restauranteur = createEntity(em);
    }

    @Test
    @Transactional
    public void createRestauranteur() throws Exception {
        int databaseSizeBeforeCreate = restauranteurRepository.findAll().size();

        // Create the Restauranteur
        restRestauranteurMockMvc.perform(post("/api/restauranteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restauranteur)))
            .andExpect(status().isCreated());

        // Validate the Restauranteur in the database
        List<Restauranteur> restauranteurList = restauranteurRepository.findAll();
        assertThat(restauranteurList).hasSize(databaseSizeBeforeCreate + 1);
        Restauranteur testRestauranteur = restauranteurList.get(restauranteurList.size() - 1);
    }

    @Test
    @Transactional
    public void createRestauranteurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = restauranteurRepository.findAll().size();

        // Create the Restauranteur with an existing ID
        restauranteur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRestauranteurMockMvc.perform(post("/api/restauranteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restauranteur)))
            .andExpect(status().isBadRequest());

        // Validate the Restauranteur in the database
        List<Restauranteur> restauranteurList = restauranteurRepository.findAll();
        assertThat(restauranteurList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRestauranteurs() throws Exception {
        // Initialize the database
        restauranteurRepository.saveAndFlush(restauranteur);

        // Get all the restauranteurList
        restRestauranteurMockMvc.perform(get("/api/restauranteurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(restauranteur.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getRestauranteur() throws Exception {
        // Initialize the database
        restauranteurRepository.saveAndFlush(restauranteur);

        // Get the restauranteur
        restRestauranteurMockMvc.perform(get("/api/restauranteurs/{id}", restauranteur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(restauranteur.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingRestauranteur() throws Exception {
        // Get the restauranteur
        restRestauranteurMockMvc.perform(get("/api/restauranteurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRestauranteur() throws Exception {
        // Initialize the database
        restauranteurRepository.saveAndFlush(restauranteur);

        int databaseSizeBeforeUpdate = restauranteurRepository.findAll().size();

        // Update the restauranteur
        Restauranteur updatedRestauranteur = restauranteurRepository.findById(restauranteur.getId()).get();
        // Disconnect from session so that the updates on updatedRestauranteur are not directly saved in db
        em.detach(updatedRestauranteur);

        restRestauranteurMockMvc.perform(put("/api/restauranteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRestauranteur)))
            .andExpect(status().isOk());

        // Validate the Restauranteur in the database
        List<Restauranteur> restauranteurList = restauranteurRepository.findAll();
        assertThat(restauranteurList).hasSize(databaseSizeBeforeUpdate);
        Restauranteur testRestauranteur = restauranteurList.get(restauranteurList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingRestauranteur() throws Exception {
        int databaseSizeBeforeUpdate = restauranteurRepository.findAll().size();

        // Create the Restauranteur

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRestauranteurMockMvc.perform(put("/api/restauranteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restauranteur)))
            .andExpect(status().isBadRequest());

        // Validate the Restauranteur in the database
        List<Restauranteur> restauranteurList = restauranteurRepository.findAll();
        assertThat(restauranteurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRestauranteur() throws Exception {
        // Initialize the database
        restauranteurRepository.saveAndFlush(restauranteur);

        int databaseSizeBeforeDelete = restauranteurRepository.findAll().size();

        // Get the restauranteur
        restRestauranteurMockMvc.perform(delete("/api/restauranteurs/{id}", restauranteur.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Restauranteur> restauranteurList = restauranteurRepository.findAll();
        assertThat(restauranteurList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Restauranteur.class);
        Restauranteur restauranteur1 = new Restauranteur();
        restauranteur1.setId(1L);
        Restauranteur restauranteur2 = new Restauranteur();
        restauranteur2.setId(restauranteur1.getId());
        assertThat(restauranteur1).isEqualTo(restauranteur2);
        restauranteur2.setId(2L);
        assertThat(restauranteur1).isNotEqualTo(restauranteur2);
        restauranteur1.setId(null);
        assertThat(restauranteur1).isNotEqualTo(restauranteur2);
    }
}
