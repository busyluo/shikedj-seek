package com.shikedj.com.seek.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.shikedj.com.seek.domain.SealedBonus;
import com.shikedj.com.seek.repository.SealedBonusRepository;
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
 * REST controller for managing SealedBonus.
 */
@RestController
@RequestMapping("/api")
public class SealedBonusResource {

    private final Logger log = LoggerFactory.getLogger(SealedBonusResource.class);

    private static final String ENTITY_NAME = "sealedBonus";

    private final SealedBonusRepository sealedBonusRepository;

    public SealedBonusResource(SealedBonusRepository sealedBonusRepository) {
        this.sealedBonusRepository = sealedBonusRepository;
    }

    /**
     * POST  /sealed-bonuses : Create a new sealedBonus.
     *
     * @param sealedBonus the sealedBonus to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sealedBonus, or with status 400 (Bad Request) if the sealedBonus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sealed-bonuses")
    @Timed
    public ResponseEntity<SealedBonus> createSealedBonus(@RequestBody SealedBonus sealedBonus) throws URISyntaxException {
        log.debug("REST request to save SealedBonus : {}", sealedBonus);
        if (sealedBonus.getId() != null) {
            throw new BadRequestAlertException("A new sealedBonus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SealedBonus result = sealedBonusRepository.save(sealedBonus);
        return ResponseEntity.created(new URI("/api/sealed-bonuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sealed-bonuses : Updates an existing sealedBonus.
     *
     * @param sealedBonus the sealedBonus to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sealedBonus,
     * or with status 400 (Bad Request) if the sealedBonus is not valid,
     * or with status 500 (Internal Server Error) if the sealedBonus couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sealed-bonuses")
    @Timed
    public ResponseEntity<SealedBonus> updateSealedBonus(@RequestBody SealedBonus sealedBonus) throws URISyntaxException {
        log.debug("REST request to update SealedBonus : {}", sealedBonus);
        if (sealedBonus.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SealedBonus result = sealedBonusRepository.save(sealedBonus);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sealedBonus.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sealed-bonuses : get all the sealedBonuses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sealedBonuses in body
     */
    @GetMapping("/sealed-bonuses")
    @Timed
    public List<SealedBonus> getAllSealedBonuses() {
        log.debug("REST request to get all SealedBonuses");
        return sealedBonusRepository.findAll();
    }

    /**
     * GET  /sealed-bonuses/:id : get the "id" sealedBonus.
     *
     * @param id the id of the sealedBonus to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sealedBonus, or with status 404 (Not Found)
     */
    @GetMapping("/sealed-bonuses/{id}")
    @Timed
    public ResponseEntity<SealedBonus> getSealedBonus(@PathVariable Long id) {
        log.debug("REST request to get SealedBonus : {}", id);
        Optional<SealedBonus> sealedBonus = sealedBonusRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sealedBonus);
    }

    /**
     * DELETE  /sealed-bonuses/:id : delete the "id" sealedBonus.
     *
     * @param id the id of the sealedBonus to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sealed-bonuses/{id}")
    @Timed
    public ResponseEntity<Void> deleteSealedBonus(@PathVariable Long id) {
        log.debug("REST request to delete SealedBonus : {}", id);

        sealedBonusRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
