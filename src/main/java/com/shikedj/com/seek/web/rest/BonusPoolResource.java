package com.shikedj.com.seek.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.shikedj.com.seek.domain.BonusPool;
import com.shikedj.com.seek.repository.BonusPoolRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing BonusPool.
 */
@RestController
@RequestMapping("/api")
public class BonusPoolResource {

    private final Logger log = LoggerFactory.getLogger(BonusPoolResource.class);

    private static final String ENTITY_NAME = "bonusPool";

    private final BonusPoolRepository bonusPoolRepository;

    public BonusPoolResource(BonusPoolRepository bonusPoolRepository) {
        this.bonusPoolRepository = bonusPoolRepository;
    }

    /**
     * POST  /bonus-pools : Create a new bonusPool.
     *
     * @param bonusPool the bonusPool to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bonusPool, or with status 400 (Bad Request) if the bonusPool has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bonus-pools")
    @Timed
    public ResponseEntity<BonusPool> createBonusPool(@RequestBody BonusPool bonusPool) throws URISyntaxException {
        log.debug("REST request to save BonusPool : {}", bonusPool);
        if (bonusPool.getId() != null) {
            throw new BadRequestAlertException("A new bonusPool cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BonusPool result = bonusPoolRepository.save(bonusPool);
        return ResponseEntity.created(new URI("/api/bonus-pools/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bonus-pools : Updates an existing bonusPool.
     *
     * @param bonusPool the bonusPool to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bonusPool,
     * or with status 400 (Bad Request) if the bonusPool is not valid,
     * or with status 500 (Internal Server Error) if the bonusPool couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bonus-pools")
    @Timed
    public ResponseEntity<BonusPool> updateBonusPool(@RequestBody BonusPool bonusPool) throws URISyntaxException {
        log.debug("REST request to update BonusPool : {}", bonusPool);
        if (bonusPool.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BonusPool result = bonusPoolRepository.save(bonusPool);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bonusPool.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bonus-pools : get all the bonusPools.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of bonusPools in body
     */
    @GetMapping("/bonus-pools")
    @Timed
    public List<BonusPool> getAllBonusPools(@RequestParam(required = false) String filter) {
        if ("area-is-null".equals(filter)) {
            log.debug("REST request to get all BonusPools where area is null");
            return StreamSupport
                .stream(bonusPoolRepository.findAll().spliterator(), false)
                .filter(bonusPool -> bonusPool.getArea() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all BonusPools");
        return bonusPoolRepository.findAll();
    }

    /**
     * GET  /bonus-pools/:id : get the "id" bonusPool.
     *
     * @param id the id of the bonusPool to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bonusPool, or with status 404 (Not Found)
     */
    @GetMapping("/bonus-pools/{id}")
    @Timed
    public ResponseEntity<BonusPool> getBonusPool(@PathVariable Long id) {
        log.debug("REST request to get BonusPool : {}", id);
        Optional<BonusPool> bonusPool = bonusPoolRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bonusPool);
    }

    /**
     * DELETE  /bonus-pools/:id : delete the "id" bonusPool.
     *
     * @param id the id of the bonusPool to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bonus-pools/{id}")
    @Timed
    public ResponseEntity<Void> deleteBonusPool(@PathVariable Long id) {
        log.debug("REST request to delete BonusPool : {}", id);

        bonusPoolRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
