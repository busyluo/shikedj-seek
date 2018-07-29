package com.shikedj.com.seek.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.shikedj.com.seek.domain.AgentProvince;
import com.shikedj.com.seek.repository.AgentProvinceRepository;
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
 * REST controller for managing AgentProvince.
 */
@RestController
@RequestMapping("/api")
public class AgentProvinceResource {

    private final Logger log = LoggerFactory.getLogger(AgentProvinceResource.class);

    private static final String ENTITY_NAME = "agentProvince";

    private final AgentProvinceRepository agentProvinceRepository;

    public AgentProvinceResource(AgentProvinceRepository agentProvinceRepository) {
        this.agentProvinceRepository = agentProvinceRepository;
    }

    /**
     * POST  /agent-provinces : Create a new agentProvince.
     *
     * @param agentProvince the agentProvince to create
     * @return the ResponseEntity with status 201 (Created) and with body the new agentProvince, or with status 400 (Bad Request) if the agentProvince has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/agent-provinces")
    @Timed
    public ResponseEntity<AgentProvince> createAgentProvince(@RequestBody AgentProvince agentProvince) throws URISyntaxException {
        log.debug("REST request to save AgentProvince : {}", agentProvince);
        if (agentProvince.getId() != null) {
            throw new BadRequestAlertException("A new agentProvince cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AgentProvince result = agentProvinceRepository.save(agentProvince);
        return ResponseEntity.created(new URI("/api/agent-provinces/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /agent-provinces : Updates an existing agentProvince.
     *
     * @param agentProvince the agentProvince to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated agentProvince,
     * or with status 400 (Bad Request) if the agentProvince is not valid,
     * or with status 500 (Internal Server Error) if the agentProvince couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/agent-provinces")
    @Timed
    public ResponseEntity<AgentProvince> updateAgentProvince(@RequestBody AgentProvince agentProvince) throws URISyntaxException {
        log.debug("REST request to update AgentProvince : {}", agentProvince);
        if (agentProvince.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AgentProvince result = agentProvinceRepository.save(agentProvince);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, agentProvince.getId().toString()))
            .body(result);
    }

    /**
     * GET  /agent-provinces : get all the agentProvinces.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of agentProvinces in body
     */
    @GetMapping("/agent-provinces")
    @Timed
    public List<AgentProvince> getAllAgentProvinces() {
        log.debug("REST request to get all AgentProvinces");
        return agentProvinceRepository.findAll();
    }

    /**
     * GET  /agent-provinces/:id : get the "id" agentProvince.
     *
     * @param id the id of the agentProvince to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the agentProvince, or with status 404 (Not Found)
     */
    @GetMapping("/agent-provinces/{id}")
    @Timed
    public ResponseEntity<AgentProvince> getAgentProvince(@PathVariable Long id) {
        log.debug("REST request to get AgentProvince : {}", id);
        Optional<AgentProvince> agentProvince = agentProvinceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(agentProvince);
    }

    /**
     * DELETE  /agent-provinces/:id : delete the "id" agentProvince.
     *
     * @param id the id of the agentProvince to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/agent-provinces/{id}")
    @Timed
    public ResponseEntity<Void> deleteAgentProvince(@PathVariable Long id) {
        log.debug("REST request to delete AgentProvince : {}", id);

        agentProvinceRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
