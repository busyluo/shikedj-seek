package com.shikedj.com.seek.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * 餐馆
 */
@ApiModel(description = "餐馆")
@Entity
@Table(name = "restaurant")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Restaurant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "open_time")
    private Instant openTime;

    @Column(name = "close_time")
    private Instant closeTime;

    @Size(max = 15)
    @Column(name = "phone", length = 15)
    private String phone;

    @OneToOne
    @JoinColumn(unique = true)
    private Location location;

    @OneToMany(mappedBy = "restaurant")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MealTable> tables = new HashSet<>();

    @OneToMany(mappedBy = "restaurant")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Image> photos = new HashSet<>();

    @OneToMany(mappedBy = "restaurant")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Cuisine> cuisines = new HashSet<>();

    @OneToMany(mappedBy = "restaurant")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MealOrder> orders = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "restaurant_types",
               joinColumns = @JoinColumn(name = "restaurants_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "types_id", referencedColumnName = "id"))
    private Set<RestaurantType> types = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("restaurants")
    private AgentArea area;

    @ManyToOne
    @JsonIgnoreProperties("restaurants")
    private Restauranteur owner;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Restaurant name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getOpenTime() {
        return openTime;
    }

    public Restaurant openTime(Instant openTime) {
        this.openTime = openTime;
        return this;
    }

    public void setOpenTime(Instant openTime) {
        this.openTime = openTime;
    }

    public Instant getCloseTime() {
        return closeTime;
    }

    public Restaurant closeTime(Instant closeTime) {
        this.closeTime = closeTime;
        return this;
    }

    public void setCloseTime(Instant closeTime) {
        this.closeTime = closeTime;
    }

    public String getPhone() {
        return phone;
    }

    public Restaurant phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Location getLocation() {
        return location;
    }

    public Restaurant location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Set<MealTable> getTables() {
        return tables;
    }

    public Restaurant tables(Set<MealTable> mealTables) {
        this.tables = mealTables;
        return this;
    }

    public Restaurant addTable(MealTable mealTable) {
        this.tables.add(mealTable);
        mealTable.setRestaurant(this);
        return this;
    }

    public Restaurant removeTable(MealTable mealTable) {
        this.tables.remove(mealTable);
        mealTable.setRestaurant(null);
        return this;
    }

    public void setTables(Set<MealTable> mealTables) {
        this.tables = mealTables;
    }

    public Set<Image> getPhotos() {
        return photos;
    }

    public Restaurant photos(Set<Image> images) {
        this.photos = images;
        return this;
    }

    public Restaurant addPhotos(Image image) {
        this.photos.add(image);
        image.setRestaurant(this);
        return this;
    }

    public Restaurant removePhotos(Image image) {
        this.photos.remove(image);
        image.setRestaurant(null);
        return this;
    }

    public void setPhotos(Set<Image> images) {
        this.photos = images;
    }

    public Set<Cuisine> getCuisines() {
        return cuisines;
    }

    public Restaurant cuisines(Set<Cuisine> cuisines) {
        this.cuisines = cuisines;
        return this;
    }

    public Restaurant addCuisines(Cuisine cuisine) {
        this.cuisines.add(cuisine);
        cuisine.setRestaurant(this);
        return this;
    }

    public Restaurant removeCuisines(Cuisine cuisine) {
        this.cuisines.remove(cuisine);
        cuisine.setRestaurant(null);
        return this;
    }

    public void setCuisines(Set<Cuisine> cuisines) {
        this.cuisines = cuisines;
    }

    public Set<MealOrder> getOrders() {
        return orders;
    }

    public Restaurant orders(Set<MealOrder> mealOrders) {
        this.orders = mealOrders;
        return this;
    }

    public Restaurant addOrders(MealOrder mealOrder) {
        this.orders.add(mealOrder);
        mealOrder.setRestaurant(this);
        return this;
    }

    public Restaurant removeOrders(MealOrder mealOrder) {
        this.orders.remove(mealOrder);
        mealOrder.setRestaurant(null);
        return this;
    }

    public void setOrders(Set<MealOrder> mealOrders) {
        this.orders = mealOrders;
    }

    public Set<RestaurantType> getTypes() {
        return types;
    }

    public Restaurant types(Set<RestaurantType> restaurantTypes) {
        this.types = restaurantTypes;
        return this;
    }

    public Restaurant addTypes(RestaurantType restaurantType) {
        this.types.add(restaurantType);
        restaurantType.getRestaurants().add(this);
        return this;
    }

    public Restaurant removeTypes(RestaurantType restaurantType) {
        this.types.remove(restaurantType);
        restaurantType.getRestaurants().remove(this);
        return this;
    }

    public void setTypes(Set<RestaurantType> restaurantTypes) {
        this.types = restaurantTypes;
    }

    public AgentArea getArea() {
        return area;
    }

    public Restaurant area(AgentArea agentArea) {
        this.area = agentArea;
        return this;
    }

    public void setArea(AgentArea agentArea) {
        this.area = agentArea;
    }

    public Restauranteur getOwner() {
        return owner;
    }

    public Restaurant owner(Restauranteur restauranteur) {
        this.owner = restauranteur;
        return this;
    }

    public void setOwner(Restauranteur restauranteur) {
        this.owner = restauranteur;
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
        Restaurant restaurant = (Restaurant) o;
        if (restaurant.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), restaurant.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Restaurant{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", openTime='" + getOpenTime() + "'" +
            ", closeTime='" + getCloseTime() + "'" +
            ", phone='" + getPhone() + "'" +
            "}";
    }
}
