import express from 'express';
import {
	getOrderItems,
	getOrderById,
	updatedOrderToPaid,
	updatedOrderToDelivered,
	getMyOrders,
	getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, getOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updatedOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updatedOrderToDelivered);

export default router;