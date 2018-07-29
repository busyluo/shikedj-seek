package com.shikedj.com.seek.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * 代理商管理员（一级代理）
 */
@ApiModel(description = "代理商管理员（一级代理）")
@Entity
@Table(name = "agent_admin")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AgentAdmin implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private UserExtra user;

    @OneToMany(mappedBy = "agent")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AgentProvince> provinces = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserExtra getUser() {
        return user;
    }

    public AgentAdmin user(UserExtra userExtra) {
        this.user = userExtra;
        return this;
    }

    public void setUser(UserExtra userExtra) {
        this.user = userExtra;
    }

    public Set<AgentProvince> getProvinces() {
        return provinces;
    }

    public AgentAdmin provinces(Set<AgentProvince> agentProvinces) {
        this.provinces = agentProvinces;
        return this;
    }

    public AgentAdmin addProvinces(AgentProvince agentProvince) {
        this.provinces.add(agentProvince);
        agentProvince.setAgent(this);
        return this;
    }

    public AgentAdmin removeProvinces(AgentProvince agentProvince) {
        this.provinces.remove(agentProvince);
        agentProvince.setAgent(null);
        return this;
    }

    public void setProvinces(Set<AgentProvince> agentProvinces) {
        this.provinces = agentProvinces;
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
        AgentAdmin agentAdmin = (AgentAdmin) o;
        if (agentAdmin.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), agentAdmin.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AgentAdmin{" +
            "id=" + getId() +
            "}";
    }
}
