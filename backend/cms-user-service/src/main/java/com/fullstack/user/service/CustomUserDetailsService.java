package com.fullstack.user.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fullstack.user.entity.User;

@Service
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {
	
    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String emailId) throws UsernameNotFoundException {
    	
    	User user = this.userService.getUserByEmail(emailId);

        log.info("User Email ID: "+ user.getEmailId());

        log.info("RETURN FROM SERVICE: "+ org.springframework.security.core.userdetails.User.withUsername(user.getEmailId()).password(user.getPassword()).authorities(user.getRole()).build());
        return org.springframework.security.core.userdetails.User.withUsername(user.getEmailId()).password(user.getPassword()).authorities(user.getRole()).build();
        
    }
    	
}
