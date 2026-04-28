package com.medicare.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    private String address;
    private List<OrderItemRequest> items;

    @Data
    public static class OrderItemRequest {
        private Long medicineId;
        private Integer quantity;
    }
}