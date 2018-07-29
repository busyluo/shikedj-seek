package com.shikedj.com.seek.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.shikedj.com.seek.domain.Cuisine;
import com.shikedj.com.seek.repository.CuisineRepository;
import com.shikedj.com.seek.web.rest.errors.BadRequestAlertException;
import com.shikedj.com.seek.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Cuisine.
 */
@RestController
@RequestMapping("/api")
public class CuisineResource {

    private final Logger log = LoggerFactory.getLogger(CuisineResource.class);

    private static final String ENTITY_NAME = "cuisine";

    private final CuisineRepository cuisineRepository;

    public CuisineResource(CuisineRepository cuisineRepository) {
        this.cuisineRepository = cuisineRepository;
    }

    /**
     * POST  /cuisines : Create a new cuisine.
     *
     * @param cuisine the cuisine to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cuisine, or with status 400 (Bad Request) if the cuisine has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cuisines")
    @Timed
    public ResponseEntity<Cuisine> createCuisine(@RequestBody Cuisine cuisine) throws URISyntaxException {
        log.debug("REST request to save Cuisine : {}", cuisine);
        if (cuisine.getId() != null) {
            throw new BadRequestAlertException("A new cuisine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cuisine result = cuisineRepository.save(cuisine);
        return ResponseEntity.created(new URI("/api/cuisines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cuisines : Updates an existing cuisine.
     *
     * @param cuisine the cuisine to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cuisine,
     * or with status 400 (Bad Request) if the cuisine is not valid,
     * or with status 500 (Internal Server Error) if the cuisine couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cuisines")
    @Timed
    public ResponseEntity<Cuisine> updateCuisine(@RequestBody Cuisine cuisine) throws URISyntaxException {
        log.debug("REST request to update Cuisine : {}", cuisine);
        if (cuisine.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cuisine result = cuisineRepository.save(cuisine);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cuisine.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cuisines : get all the cuisines.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cuisines in body
     */
    @GetMapping("/cuisines")
    @Timed
    public List<Cuisine> getAllCuisines() {
        log.debug("REST request to get all Cuisines");
        return cuisineRepository.findAll();
    }

    /**
     * GET  /cuisines/:id : get the "id" cuisine.
     *
     * @param id the id of the cuisine to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cuisine, or with status 404 (Not Found)
     */
    @GetMapping("/cuisines/{id}")
    @Timed
    public ResponseEntity<Cuisine> getCuisine(@PathVariable Long id) {
        log.debug("REST request to get Cuisine : {}", id);
        Optional<Cuisine> cuisine = cuisineRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cuisine);
    }

    /**
     * DELETE  /cuisines/:id : delete the "id" cuisine.
     *
     * @param id the id of the cuisine to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cuisines/{id}")
    @Timed
    public ResponseEntity<Void> deleteCuisine(@PathVariable Long id) {
        log.debug("REST request to delete Cuisine : {}", id);

        cuisineRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
