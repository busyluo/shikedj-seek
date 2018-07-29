package com.shikedj.com.seek.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * 代理区域
 */
@ApiModel(description = "代理区域")
@Entity
@Table(name = "agent_area")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AgentArea implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToOne
    @JoinColumn(unique = true)
    private BonusPool bonusPool;

    @OneToMany(mappedBy = "area")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Restaurant> restaurants = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("areas")
    private AgentProvince province;

    @ManyToOne
    @JsonIgnoreProperties("areas")
    private Agent agent;

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

    public AgentArea name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BonusPool getBonusPool() {
        return bonusPool;
    }

    public AgentArea bonusPool(BonusPool bonusPool) {
        this.bonusPool = bonusPool;
        return this;
    }

    public void setBonusPool(BonusPool bonusPool) {
        this.bonusPool = bonusPool;
    }

    public Set<Restaurant> getRestaurants() {
        return restaurants;
    }

    public AgentArea restaurants(Set<Restaurant> restaurants) {
        this.restaurants = restaurants;
        return this;
    }

    public AgentArea addRestaurant(Restaurant restaurant) {
        this.restaurants.add(restaurant);
        restaurant.setArea(this);
        return this;
    }

    public AgentArea removeRestaurant(Restaurant restaurant) {
        this.restaurants.remove(restaurant);
        restaurant.setArea(null);
        return this;
    }

    public void setRestaurants(Set<Restaurant> restaurants) {
        this.restaurants = restaurants;
    }

    public AgentProvince getProvince() {
        return province;
    }

    public AgentArea province(AgentProvince agentProvince) {
        this.province = agentProvince;
        return this;
    }

    public void setProvince(AgentProvince agentProvince) {
        this.province = agentProvince;
    }

    public Agent getAgent() {
        return agent;
    }

    public AgentArea agent(Agent agent) {
        this.agent = agent;
        return this;
    }

    public void setAgent(Agent agent) {
        this.agent = agent;
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
        AgentArea agentArea = (AgentArea) o;
        if (agentArea.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), agentArea.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AgentArea{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
