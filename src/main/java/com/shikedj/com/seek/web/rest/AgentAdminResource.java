package com.shikedj.com.seek.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.shikedj.com.seek.domain.AgentAdmin;
import com.shikedj.com.seek.repository.AgentAdminRepository;
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
 * REST controller for managing AgentAdmin.
 */
@RestController
@RequestMapping("/api")
public class AgentAdminResource {

    private final Logger log = LoggerFactory.getLogger(AgentAdminResource.class);

    private static final String ENTITY_NAME = "agentAdmin";

    private final AgentAdminRepository agentAdminRepository;

    public AgentAdminResource(AgentAdminRepository agentAdminRepository) {
        this.agentAdminRepository = agentAdminRepository;
    }

    /**
     * POST  /agent-admins : Create a new agentAdmin.
     *
     * @param agentAdmin the agentAdmin to create
     * @return the ResponseEntity with status 201 (Created) and with body the new agentAdmin, or with status 400 (Bad Request) if the agentAdmin has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/agent-admins")
    @Timed
    public ResponseEntity<AgentAdmin> createAgentAdmin(@RequestBody AgentAdmin agentAdmin) throws URISyntaxException {
        log.debug("REST request to save AgentAdmin : {}", agentAdmin);
        if (agentAdmin.getId() != null) {
            throw new BadRequestAlertException("A new agentAdmin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AgentAdmin result = agentAdminRepository.save(agentAdmin);
        return ResponseEntity.created(new URI("/api/agent-admins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /agent-admins : Updates an existing agentAdmin.
     *
     * @param agentAdmin the agentAdmin to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated agentAdmin,
     * or with status 400 (Bad Request) if the agentAdmin is not valid,
     * or with status 500 (Internal Server Error) if the agentAdmin couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/agent-admins")
    @Timed
    public ResponseEntity<AgentAdmin> updateAgentAdmin(@RequestBody AgentAdmin agentAdmin) throws URISyntaxException {
        log.debug("REST request to update AgentAdmin : {}", agentAdmin);
        if (agentAdmin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AgentAdmin result = agentAdminRepository.save(agentAdmin);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, agentAdmin.getId().toString()))
            .body(result);
    }

    /**
     * GET  /agent-admins : get all the agentAdmins.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of agentAdmins in body
     */
    @GetMapping("/agent-admins")
    @Timed
    public List<AgentAdmin> getAllAgentAdmins() {
        log.debug("REST request to get all AgentAdmins");
        return agentAdminRepository.findAll();
    }

    /**
     * GET  /agent-admins/:id : get the "id" agentAdmin.
     *
     * @param id the id of the agentAdmin to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the agentAdmin, or with status 404 (Not Found)
     */
    @GetMapping("/agent-admins/{id}")
    @Timed
    public ResponseEntity<AgentAdmin> getAgentAdmin(@PathVariable Long id) {
        log.debug("REST request to get AgentAdmin : {}", id);
        Optional<AgentAdmin> agentAdmin = agentAdminRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(agentAdmin);
    }

    /**
     * DELETE  /agent-admins/:id : delete the "id" agentAdmin.
     *
     * @param id the id of the agentAdmin to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/agent-admins/{id}")
    @Timed
    public ResponseEntity<Void> deleteAgentAdmin(@PathVariable Long id) {
        log.debug("REST request to delete AgentAdmin : {}", id);

        agentAdminRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
