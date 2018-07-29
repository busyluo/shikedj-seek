package com.shikedj.com.seek.repository;

import com.shikedj.com.seek.domain.AgentAdmin;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AgentAdmin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgentAdminRepository extends JpaRepository<AgentAdmin, Long> {

}
