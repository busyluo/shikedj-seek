package com.shikedj.com.seek.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.shikedj.com.seek.domain.RestaurantType;
import com.shikedj.com.seek.repository.RestaurantTypeRepository;
import com.shikedj.com.seek.web.rest.errors.BadRequestAlertException;
import com.shikedj.com.seek.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing RestaurantType.
 */
@RestController
@RequestMapping("/api")
public class RestaurantTypeResource {

    private final Logger log = LoggerFactory.getLogger(RestaurantTypeResource.class);

    private static final String ENTITY_NAME = "restaurantType";

    private final RestaurantTypeRepository restaurantTypeRepository;

    public RestaurantTypeResource(RestaurantTypeRepository restaurantTypeRepository) {
        this.restaurantTypeRepository = restaurantTypeRepository;
    }

    /**
     * POST  /restaurant-types : Create a new restaurantType.
     *
     * @param restaurantType the restaurantType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new restaurantType, or with status 400 (Bad Request) if the restaurantType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/restaurant-types")
    @Timed
    public ResponseEntity<RestaurantType> createRestaurantType(@Valid @RequestBody RestaurantType restaurantType) throws URISyntaxException {
        log.debug("REST request to save RestaurantType : {}", restaurantType);
        if (restaurantType.getId() != null) {
            throw new BadRequestAlertException("A new restaurantType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RestaurantType result = restaurantTypeRepository.save(restaurantType);
        return ResponseEntity.created(new URI("/api/restaurant-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /restaurant-types : Updates an existing restaurantType.
     *
     * @param restaurantType the restaurantType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated restaurantType,
     * or with status 400 (Bad Request) if the restaurantType is not valid,
     * or with status 500 (Internal Server Error) if the restaurantType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/restaurant-types")
    @Timed
    public ResponseEntity<RestaurantType> updateRestaurantType(@Valid @RequestBody RestaurantType restaurantType) throws URISyntaxException {
        log.debug("REST request to update RestaurantType : {}", restaurantType);
        if (restaurantType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RestaurantType result = restaurantTypeRepository.save(restaurantType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, restaurantType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /restaurant-types : get all the restaurantTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of restaurantTypes in body
     */
    @GetMapping("/restaurant-types")
    @Timed
    public List<RestaurantType> getAllRestaurantTypes() {
        log.debug("REST request to get all RestaurantTypes");
        return restaurantTypeRepository.findAll();
    }

    /**
     * GET  /restaurant-types/:id : get the "id" restaurantType.
     *
     * @param id the id of the restaurantType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the restaurantType, or with status 404 (Not Found)
     */
    @GetMapping("/restaurant-types/{id}")
    @Timed
    public ResponseEntity<RestaurantType> getRestaurantType(@PathVariable Long id) {
        log.debug("REST request to get RestaurantType : {}", id);
        Optional<RestaurantType> restaurantType = restaurantTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(restaurantType);
    }

    /**
     * DELETE  /restaurant-types/:id : delete the "id" restaurantType.
     *
     * @param id the id of the restaurantType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/restaurant-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteRestaurantType(@PathVariable Long id) {
        log.debug("REST request to delete RestaurantType : {}", id);

        restaurantTypeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
