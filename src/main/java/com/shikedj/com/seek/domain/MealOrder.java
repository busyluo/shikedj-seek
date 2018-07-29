package com.shikedj.com.seek.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.shikedj.com.seek.domain.enumeration.MealOrderType;

import com.shikedj.com.seek.domain.enumeration.MealOrderStatus;

/**
 * 用餐订单
 */
@ApiModel(description = "用餐订单")
@Entity
@Table(name = "meal_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MealOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_time")
    private Instant time;

    /**
     * 订单类型
     */
    @ApiModelProperty(value = "订单类型")
    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private MealOrderType type;

    /**
     * 订单状态
     */
    @ApiModelProperty(value = "订单状态")
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private MealOrderStatus status;

    /**
     * 使用积分数量
     */
    @ApiModelProperty(value = "使用积分数量")
    @Column(name = "point_usage")
    private Double pointUsage;

    /**
     * 已支付金额
     */
    @ApiModelProperty(value = "已支付金额")
    @Column(name = "paid_amount")
    private Double paidAmount;

    /**
     * 实际付款金额
     */
    @ApiModelProperty(value = "实际付款金额")
    @Column(name = "actual_pay")
    private Double actualPay;

    /**
     * 消费总额
     */
    @ApiModelProperty(value = "消费总额")
    @Column(name = "total_price")
    private Double totalPrice;

    @OneToMany(mappedBy = "order")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MealOrderItem> dishes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("orders")
    private Restaurant restaurant;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getTime() {
        return time;
    }

    public MealOrder time(Instant time) {
        this.time = time;
        return this;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    public MealOrderType getType() {
        return type;
    }

    public MealOrder type(MealOrderType type) {
        this.type = type;
        return this;
    }

    public void setType(MealOrderType type) {
        this.type = type;
    }

    public MealOrderStatus getStatus() {
        return status;
    }

    public MealOrder status(MealOrderStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(MealOrderStatus status) {
        this.status = status;
    }

    public Double getPointUsage() {
        return pointUsage;
    }

    public MealOrder pointUsage(Double pointUsage) {
        this.pointUsage = pointUsage;
        return this;
    }

    public void setPointUsage(Double pointUsage) {
        this.pointUsage = pointUsage;
    }

    public Double getPaidAmount() {
        return paidAmount;
    }

    public MealOrder paidAmount(Double paidAmount) {
        this.paidAmount = paidAmount;
        return this;
    }

    public void setPaidAmount(Double paidAmount) {
        this.paidAmount = paidAmount;
    }

    public Double getActualPay() {
        return actualPay;
    }

    public MealOrder actualPay(Double actualPay) {
        this.actualPay = actualPay;
        return this;
    }

    public void setActualPay(Double actualPay) {
        this.actualPay = actualPay;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public MealOrder totalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Set<MealOrderItem> getDishes() {
        return dishes;
    }

    public MealOrder dishes(Set<MealOrderItem> mealOrderItems) {
        this.dishes = mealOrderItems;
        return this;
    }

    public MealOrder addDishes(MealOrderItem mealOrderItem) {
        this.dishes.add(mealOrderItem);
        mealOrderItem.setOrder(this);
        return this;
    }

    public MealOrder removeDishes(MealOrderItem mealOrderItem) {
        this.dishes.remove(mealOrderItem);
        mealOrderItem.setOrder(null);
        return this;
    }

    public void setDishes(Set<MealOrderItem> mealOrderItems) {
        this.dishes = mealOrderItems;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public MealOrder restaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
        return this;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
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
        MealOrder mealOrder = (MealOrder) o;
        if (mealOrder.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mealOrder.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MealOrder{" +
            "id=" + getId() +
            ", time='" + getTime() + "'" +
            ", type='" + getType() + "'" +
            ", status='" + getStatus() + "'" +
            ", pointUsage=" + getPointUsage() +
            ", paidAmount=" + getPaidAmount() +
            ", actualPay=" + getActualPay() +
            ", totalPrice=" + getTotalPrice() +
            "}";
    }
}
