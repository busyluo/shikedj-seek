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
 * 省级代理
 */
@ApiModel(description = "省级代理")
@Entity
@Table(name = "agent_province")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AgentProvince implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToOne
    @JoinColumn(unique = true)
    private Province province;

    @OneToMany(mappedBy = "province")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AgentArea> areas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("provinces")
    private AgentAdmin agent;

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

    public AgentProvince name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Province getProvince() {
        return province;
    }

    public AgentProvince province(Province province) {
        this.province = province;
        return this;
    }

    public void setProvince(Province province) {
        this.province = province;
    }

    public Set<AgentArea> getAreas() {
        return areas;
    }

    public AgentProvince areas(Set<AgentArea> agentAreas) {
        this.areas = agentAreas;
        return this;
    }

    public AgentProvince addAreas(AgentArea agentArea) {
        this.areas.add(agentArea);
        agentArea.setProvince(this);
        return this;
    }

    public AgentProvince removeAreas(AgentArea agentArea) {
        this.areas.remove(agentArea);
        agentArea.setProvince(null);
        return this;
    }

    public void setAreas(Set<AgentArea> agentAreas) {
        this.areas = agentAreas;
    }

    public AgentAdmin getAgent() {
        return agent;
    }

    public AgentProvince agent(AgentAdmin agentAdmin) {
        this.agent = agentAdmin;
        return this;
    }

    public void setAgent(AgentAdmin agentAdmin) {
        this.agent = agentAdmin;
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
        AgentProvince agentProvince = (AgentProvince) o;
        if (agentProvince.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), agentProvince.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AgentProvince{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
