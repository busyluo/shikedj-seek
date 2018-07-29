package com.shikedj.com.seek.repository;

import com.shikedj.com.seek.domain.AgentArea;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AgentArea entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgentAreaRepository extends JpaRepository<AgentArea, Long> {

}
