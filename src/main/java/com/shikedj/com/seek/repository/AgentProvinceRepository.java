package com.shikedj.com.seek.repository;

import com.shikedj.com.seek.domain.AgentProvince;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AgentProvince entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgentProvinceRepository extends JpaRepository<AgentProvince, Long> {

}
