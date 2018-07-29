package com.shikedj.com.seek.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Customer.
 */
@Entity
@Table(name = "customer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 微信用户ID
     */
    @ApiModelProperty(value = "微信用户ID")
    @Column(name = "open_id")
    private String openID;

    /**
     * 积分
     */
    @ApiModelProperty(value = "积分")
    @Column(name = "point")
    private Double point;

    @OneToOne
    @JoinColumn(unique = true)
    private UserExtra user;

    @OneToMany(mappedBy = "customer")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Bonus> bonuses = new HashSet<>();

    @OneToMany(mappedBy = "customer")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SealedBonus> sealedBonuses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOpenID() {
        return openID;
    }

    public Customer openID(String openID) {
        this.openID = openID;
        return this;
    }

    public void setOpenID(String openID) {
        this.openID = openID;
    }

    public Double getPoint() {
        return point;
    }

    public Customer point(Double point) {
        this.point = point;
        return this;
    }

    public void setPoint(Double point) {
        this.point = point;
    }

    public UserExtra getUser() {
        return user;
    }

    public Customer user(UserExtra userExtra) {
        this.user = userExtra;
        return this;
    }

    public void setUser(UserExtra userExtra) {
        this.user = userExtra;
    }

    public Set<Bonus> getBonuses() {
        return bonuses;
    }

    public Customer bonuses(Set<Bonus> bonuses) {
        this.bonuses = bonuses;
        return this;
    }

    public Customer addBonus(Bonus bonus) {
        this.bonuses.add(bonus);
        bonus.setCustomer(this);
        return this;
    }

    public Customer removeBonus(Bonus bonus) {
        this.bonuses.remove(bonus);
        bonus.setCustomer(null);
        return this;
    }

    public void setBonuses(Set<Bonus> bonuses) {
        this.bonuses = bonuses;
    }

    public Set<SealedBonus> getSealedBonuses() {
        return sealedBonuses;
    }

    public Customer sealedBonuses(Set<SealedBonus> sealedBonuses) {
        this.sealedBonuses = sealedBonuses;
        return this;
    }

    public Customer addSealedBonus(SealedBonus sealedBonus) {
        this.sealedBonuses.add(sealedBonus);
        sealedBonus.setCustomer(this);
        return this;
    }

    public Customer removeSealedBonus(SealedBonus sealedBonus) {
        this.sealedBonuses.remove(sealedBonus);
        sealedBonus.setCustomer(null);
        return this;
    }

    public void setSealedBonuses(Set<SealedBonus> sealedBonuses) {
        this.sealedBonuses = sealedBonuses;
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
        Customer customer = (Customer) o;
        if (customer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", openID='" + getOpenID() + "'" +
            ", point=" + getPoint() +
            "}";
    }
}
