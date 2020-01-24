package org.jhipster.winea.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, org.jhipster.winea.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, org.jhipster.winea.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, org.jhipster.winea.domain.User.class.getName());
            createCache(cm, org.jhipster.winea.domain.Authority.class.getName());
            createCache(cm, org.jhipster.winea.domain.User.class.getName() + ".authorities");
            createCache(cm, org.jhipster.winea.domain.Region.class.getName());
            createCache(cm, org.jhipster.winea.domain.Country.class.getName());
            createCache(cm, org.jhipster.winea.domain.Location.class.getName());
            createCache(cm, org.jhipster.winea.domain.Department.class.getName());
            createCache(cm, org.jhipster.winea.domain.Department.class.getName() + ".employees");
            createCache(cm, org.jhipster.winea.domain.Task.class.getName());
            createCache(cm, org.jhipster.winea.domain.Task.class.getName() + ".jobs");
            createCache(cm, org.jhipster.winea.domain.Employee.class.getName());
            createCache(cm, org.jhipster.winea.domain.Employee.class.getName() + ".jobs");
            createCache(cm, org.jhipster.winea.domain.Employee.class.getName() + ".requestleaves");
            createCache(cm, org.jhipster.winea.domain.Job.class.getName());
            createCache(cm, org.jhipster.winea.domain.Job.class.getName() + ".tasks");
            createCache(cm, org.jhipster.winea.domain.RequestLeave.class.getName());
            createCache(cm, org.jhipster.winea.domain.JobHistory.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }

}
