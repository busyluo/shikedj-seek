package com.shikedj.com.seek.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.shikedj.com.seek.domain.Restauranteur;
import com.shikedj.com.seek.repository.RestauranteurRepository;
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
 * REST controller for managing Restauranteur.
 */
@RestController
@RequestMapping("/api")
public class RestauranteurResource {

    private final Logger log = LoggerFactory.getLogger(RestauranteurResource.class);

    private static final String ENTITY_NAME = "restauranteur";

    private final RestauranteurRepository restauranteurRepository;

    public RestauranteurResource(RestauranteurRepository restauranteurRepository) {
        this.restauranteurRepository = restauranteurRepository;
    }

    /**
     * POST  /restauranteurs : Create a new restauranteur.
     *
     * @param restauranteur the restauranteur to create
     * @return the ResponseEntity with status 201 (Created) and with body the new restauranteur, or with status 400 (Bad Request) if the restauranteur has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/restauranteurs")
    @Timed
    public ResponseEntity<Restauranteur> createRestauranteur(@RequestBody Restauranteur restauranteur) throws URISyntaxException {
        log.debug("REST request to save Restauranteur : {}", restauranteur);
        if (restauranteur.getId() != null) {
            throw new BadRequestAlertException("A new restauranteur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Restauranteur result = restauranteurRepository.save(restauranteur);
        return ResponseEntity.created(new URI("/api/restauranteurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /restauranteurs : Updates an existing restauranteur.
     *
     * @param restauranteur the restauranteur to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated restauranteur,
     * or with status 400 (Bad Request) if the restauranteur is not valid,
     * or with status 500 (Internal Server Error) if the restauranteur couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/restauranteurs")
    @Timed
    public ResponseEntity<Restauranteur> updateRestauranteur(@RequestBody Restauranteur restauranteur) throws URISyntaxException {
        log.debug("REST request to update Restauranteur : {}", restauranteur);
        if (restauranteur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Restauranteur result = restauranteurRepository.save(restauranteur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, restauranteur.getId().toString()))
            .body(result);
    }

    /**
     * GET  /restauranteurs : get all the restauranteurs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of restauranteurs in body
     */
    @GetMapping("/restauranteurs")
    @Timed
    public List<Restauranteur> getAllRestauranteurs() {
        log.debug("REST request to get all Restauranteurs");
        return restauranteurRepository.findAll();
    }

    /**
     * GET  /restauranteurs/:id : get the "id" restauranteur.
     *
     * @param id the id of the restauranteur to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the restauranteur, or with status 404 (Not Found)
     */
    @GetMapping("/restauranteurs/{id}")
    @Timed
    public ResponseEntity<Restauranteur> getRestauranteur(@PathVariable Long id) {
        log.debug("REST request to get Restauranteur : {}", id);
        Optional<Restauranteur> restauranteur = restauranteurRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(restauranteur);
    }

    /**
     * DELETE  /restauranteurs/:id : delete the "id" restauranteur.
     *
     * @param id the id of the restauranteur to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/restauranteurs/{id}")
    @Timed
    public ResponseEntity<Void> deleteRestauranteur(@PathVariable Long id) {
        log.debug("REST request to delete Restauranteur : {}", id);

        restauranteurRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
