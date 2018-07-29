package com.shikedj.com.seek.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.shikedj.com.seek.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Province.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Province.class.getName() + ".cities", jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.City.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.City.class.getName() + ".districts", jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.District.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.AgentArea.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.AgentArea.class.getName() + ".restaurants", jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.AgentProvince.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.AgentProvince.class.getName() + ".areas", jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Location.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.RestaurantType.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.RestaurantType.class.getName() + ".restaurants", jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.MealTable.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Restaurant.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Restaurant.class.getName() + ".tables", jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Restaurant.class.getName() + ".photos", jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Restaurant.class.getName() + ".cuisines", jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Restaurant.class.getName() + ".orders", jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Restaurant.class.getName() + ".types", jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Dish.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Dish.class.getName() + ".images", jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Cuisine.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Cuisine.class.getName() + ".dishes", jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.MealOrderItem.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.MealOrder.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.MealOrder.class.getName() + ".dishes", jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Bonus.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.BonusPool.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.SealedBonus.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.UserExtra.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Customer.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Customer.class.getName() + ".bonuses", jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Customer.class.getName() + ".sealedBonuses", jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.BankAccount.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Restauranteur.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Restauranteur.class.getName() + ".restaurants", jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.AgentAdmin.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.AgentAdmin.class.getName() + ".provinces", jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Agent.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Agent.class.getName() + ".areas", jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Image.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.BankTransfer.class.getName(), jcacheConfiguration);
            cm.createCache(com.shikedj.com.seek.domain.Admin.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
