package com.medicare.service;

import com.medicare.dto.OrderRequest;
import com.medicare.model.*;
import com.medicare.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired private OrderRepository orderRepository;
    @Autowired private MedicineRepository medicineRepository;
    @Autowired private UserRepository userRepository;

    public Order placeOrder(Long userId, OrderRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setAddress(request.getAddress());

        List<OrderItem> items = new ArrayList<>();
        double total = 0.0;

        for (OrderRequest.OrderItemRequest itemReq : request.getItems()) {
            Medicine medicine = medicineRepository.findById(itemReq.getMedicineId())
                    .orElseThrow(() -> new RuntimeException("Medicine not found"));

            medicine.setStock(medicine.getStock() - itemReq.getQuantity());
            medicineRepository.save(medicine);

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setMedicine(medicine);
            item.setQuantity(itemReq.getQuantity());
            item.setPrice(medicine.getPrice());

            total += medicine.getPrice() * itemReq.getQuantity();
            items.add(item);
        }

        order.setItems(items);
        order.setTotalAmount(total);
        order.setPaymentStatus(Order.PaymentStatus.PAID);

        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(Order.OrderStatus.valueOf(status));
        return orderRepository.save(order);
    }
}