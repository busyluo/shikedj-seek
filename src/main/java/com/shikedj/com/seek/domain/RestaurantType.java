package com.shikedj.com.seek.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * 餐馆分类
 */
@ApiModel(description = "餐馆分类")
@Entity
@Table(name = "restaurant_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RestaurantType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 20)
    @Column(name = "jhi_type", length = 20)
    private String type;

    @ManyToMany(mappedBy = "types")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Restaurant> restaurants = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public RestaurantType type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Set<Restaurant> getRestaurants() {
        return restaurants;
    }

    public RestaurantType restaurants(Set<Restaurant> restaurants) {
        this.restaurants = restaurants;
        return this;
    }

    public RestaurantType addRestaurants(Restaurant restaurant) {
        this.restaurants.add(restaurant);
        restaurant.getTypes().add(this);
        return this;
    }

    public RestaurantType removeRestaurants(Restaurant restaurant) {
        this.restaurants.remove(restaurant);
        restaurant.getTypes().remove(this);
        return this;
    }

    public void setRestaurants(Set<Restaurant> restaurants) {
        this.restaurants = restaurants;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        RestaurantType restaurantType = (RestaurantType) o;
        if (restaurantType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), restaurantType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RestaurantType{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            "}";
    }
}
