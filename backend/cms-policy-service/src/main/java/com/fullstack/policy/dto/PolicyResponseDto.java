package com.fullstack.policy.dto;

import java.util.ArrayList;
import java.util.List;

import com.fullstack.policy.entity.Policy;

import lombok.Data;

@Data
public class PolicyResponseDto extends CommonApiResponse {

	private List<Policy> policies = new ArrayList<>();

}
