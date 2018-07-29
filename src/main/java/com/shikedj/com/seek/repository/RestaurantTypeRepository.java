package com.shikedj.com.seek.repository;

import com.shikedj.com.seek.domain.RestaurantType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RestaurantType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RestaurantTypeRepository extends JpaRepository<RestaurantType, Long> {

}
