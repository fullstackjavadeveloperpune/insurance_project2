package com.fullstack.user.dto;

import com.fullstack.user.entity.User;

import lombok.Data;

@Data
public class UserDetailResponseDto extends CommonApiResponse {

	private User user;


}
