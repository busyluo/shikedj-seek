package com.shikedj.com.seek.repository;

import com.shikedj.com.seek.domain.Restauranteur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Restauranteur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RestauranteurRepository extends JpaRepository<Restauranteur, Long> {

}
