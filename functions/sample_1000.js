var utils = require('./utils.js');
var kdTree = require('./kd-tree-javascript/kdTree.js');

kd_tree_sample_points = [
	{x: -0.9425, y: -0.2041, z: -0.2648},
	{x: 0.5224, y: 0.7539, z: 0.3985},
	{x: 0.5528, y: 0.0429, z: -0.8322},
	{x: 0.6499, y: 0.0243, z: -0.7596},
	{x: 0.6986, y: 0.1199, z: -0.7054},
	{x: -0.0303, y: 0.9929, z: -0.1151},
	{x: 0.8482, y: 0.0839, z: -0.5230},
	{x: 0.9526, y: 0.0586, z: -0.2985},
	{x: -0.2253, y: -0.1544, z: -0.9620},
	{x: 0.9065, y: 0.0667, z: -0.4168},
	{x: 0.9313, y: -0.0364, z: -0.3625},
	{x: 0.9274, y: 0.2528, z: -0.2755},
	{x: 0.9601, y: 0.1575, z: -0.2311},
	{x: 0.9827, y: 0.0588, z: -0.1759},
	{x: 0.4552, y: 0.2145, z: 0.8641},
	{x: 0.0245, y: 0.6354, z: 0.7718},
	{x: 0.9838, y: 0.1794, z: 0.0003},
	{x: 0.9944, y: 0.0840, z: 0.0637},
	{x: 0.1522, y: 0.2044, z: -0.9670},
	{x: 0.9784, y: 0.1048, z: 0.1784},
	{x: 0.1846, y: 0.8742, z: -0.4490},
	{x: 0.9353, y: 0.0254, z: 0.3528},
	{x: 0.8863, y: 0.0396, z: 0.4613},
	{x: -0.4683, y: 0.2315, z: 0.8527},
	{x: 0.8514, y: -0.0566, z: 0.5215},
	{x: 0.8241, y: 0.0513, z: 0.5642},
	{x: 0.7803, y: -0.0439, z: 0.6238},
	{x: 0.0253, y: -0.0740, z: 0.9969},
	{x: 0.6571, y: 0.0871, z: 0.7487},
	{x: 0.5676, y: 0.1304, z: 0.8129},
	{x: 0.4011, y: 0.0242, z: 0.9157},
	{x: -0.1442, y: 0.9656, z: 0.2165},
	{x: 0.3730, y: -0.9271, z: -0.0358},
	{x: 0.3781, y: 0.2043, z: -0.9030},
	{x: 0.5067, y: 0.1507, z: -0.8489},
	{x: 0.6084, y: 0.1352, z: -0.7820},
	{x: 0.6523, y: 0.2322, z: -0.7215},
	{x: 0.7786, y: 0.1026, z: -0.6190},
	{x: 0.7782, y: 0.4864, z: -0.3974},
	{x: 0.8083, y: 0.1983, z: -0.5544},
	{x: 0.8251, y: 0.2929, z: -0.4831},
	{x: 0.9227, y: 0.1605, z: -0.3506},
	{x: -0.1930, y: -0.2652, z: -0.9447},
	{x: 0.2991, y: -0.7068, z: -0.6410},
	{x: 0.9420, y: 0.2887, z: -0.1714},
	{x: 0.9597, y: 0.2731, z: -0.0659},
	{x: 0.9245, y: 0.3775, z: -0.0524},
	{x: 0.9124, y: 0.4034, z: 0.0693},
	{x: 0.8871, y: 0.4228, z: 0.1851},
	{x: 0.9539, y: 0.2970, z: 0.0444},
	{x: 0.9485, y: 0.2208, z: 0.2270},
	{x: 0.9358, y: 0.3163, z: 0.1556},
	{x: 0.9052, y: 0.3318, z: 0.2656},
	{x: 0.9110, y: 0.2363, z: 0.3379},
	{x: 0.8596, y: 0.2498, z: 0.4457},
	{x: 0.8511, y: 0.1507, z: 0.5028},
	{x: 0.5268, y: -0.1617, z: -0.8345},
	{x: 0.4062, y: -0.8690, z: -0.2825},
	{x: 0.7849, y: 0.1609, z: 0.5984},
	{x: 0.6297, y: 0.2089, z: 0.7482},
	{x: -0.4992, y: -0.5457, z: 0.6731},
	{x: 0.4784, y: 0.1069, z: 0.8716},
	{x: 0.3721, y: 0.1418, z: 0.9173},
	{x: 0.2940, y: 0.0590, z: 0.9540},
	{x: 0.1776, y: 0.0098, z: -0.9841},
	{x: 0.4599, y: 0.2507, z: -0.8518},
	{x: 0.5606, y: 0.2450, z: -0.7910},
	{x: 0.8616, y: 0.3439, z: 0.3733},
	{x: 0.5910, y: 0.3426, z: -0.7303},
	{x: 0.6792, y: 0.3292, z: -0.6559},
	{x: 0.6980, y: 0.4219, z: -0.5786},
	{x: 0.7573, y: 0.3130, z: -0.5732},
	{x: 0.7092, y: 0.5082, z: -0.4887},
	{x: 0.8347, y: 0.3809, z: -0.3977},
	{x: 0.8390, y: 0.4548, z: -0.2988},
	{x: 0.7755, y: 0.5572, z: -0.2970},
	{x: 0.8357, y: 0.5103, z: -0.2028},
	{x: 0.8797, y: 0.4629, z: -0.1087},
	{x: 0.7105, y: 0.5858, z: -0.3899},
	{x: 0.8213, y: 0.5628, z: -0.0929},
	{x: 0.8731, y: 0.4875, z: 0.0001},
	{x: 0.8536, y: 0.5093, z: 0.1093},
	{x: 0.8232, y: 0.5241, z: 0.2183},
	{x: 0.7814, y: 0.5319, z: 0.3263},
	{x: 0.8495, y: 0.4357, z: 0.2975},
	{x: -0.2468, y: 0.1027, z: 0.9636},
	{x: 0.7977, y: 0.4449, z: 0.4071},
	{x: 0.1627, y: -0.2310, z: 0.9593},
	{x: 0.7389, y: 0.3623, z: 0.5681},
	{x: 0.7948, y: 0.2599, z: 0.5484},
	{x: 0.6632, y: 0.3722, z: 0.6494},
	{x: 0.5757, y: 0.4340, z: 0.6929},
	{x: 0.5132, y: 0.3740, z: 0.7725},
	{x: 0.5376, y: 0.2555, z: 0.8036},
	{x: 0.3492, y: 0.2587, z: 0.9006},
	{x: 0.2158, y: -0.0260, z: 0.9761},
	{x: 0.2310, y: 0.1126, z: -0.9664},
	{x: 0.2889, y: 0.3200, z: -0.9023},
	{x: 0.3872, y: 0.3360, z: -0.8586},
	{x: 0.4929, y: 0.3498, z: -0.7966},
	{x: 0.6143, y: 0.4353, z: -0.6581},
	{x: 0.4626, y: 0.6167, z: -0.6369},
	{x: -0.6389, y: 0.0488, z: -0.7677},
	{x: 0.6308, y: 0.5228, z: -0.5734},
	{x: 0.8405, y: -0.5070, z: 0.1908},
	{x: 0.6358, y: 0.6762, z: -0.3721},
	{x: 0.7049, y: 0.6511, z: -0.2813},
	{x: 0.2048, y: -0.4480, z: 0.8703},
	{x: 0.7686, y: 0.6112, z: -0.1887},
	{x: 0.6725, y: 0.7383, z: -0.0519},
	{x: 0.7523, y: 0.6547, z: -0.0744},
	{x: 0.8087, y: 0.5879, z: 0.0188},
	{x: 0.7329, y: 0.6792, z: 0.0388},
	{x: 0.7873, y: -0.6015, z: 0.1353},
	{x: 0.5690, y: 0.7715, z: 0.2847},
	{x: -0.1491, y: -0.2403, z: 0.9592},
	{x: 0.7501, y: 0.6177, z: 0.2361},
	{x: -0.7850, y: 0.5957, z: 0.1702},
	{x: 0.6162, y: 0.6969, z: 0.3670},
	{x: 0.7255, y: 0.5343, z: 0.4339},
	{x: 0.6520, y: 0.6136, z: 0.4454},
	{x: 0.7248, y: 0.4607, z: 0.5123},
	{x: 0.6498, y: 0.4717, z: 0.5960},
	{x: 0.4806, y: 0.4880, z: 0.7286},
	{x: -0.6173, y: 0.7753, z: 0.1334},
	{x: 0.4338, y: 0.3253, z: 0.8403},
	{x: 0.2405, y: 0.2983, z: 0.9237},
	{x: 0.2661, y: 0.1811, z: 0.9468},
	{x: 0.2703, y: 0.2162, z: -0.9382},
	{x: 0.4466, y: 0.8881, z: 0.1087},
	{x: 0.3099, y: 0.4290, z: -0.8485},
	{x: 0.3354, y: 0.5265, z: -0.7812},
	{x: 0.4417, y: 0.5321, z: -0.7223},
	{x: -0.7669, y: -0.1000, z: -0.6339},
	{x: 0.5554, y: 0.6141, z: -0.5607},
	{x: -0.7876, y: 0.4996, z: -0.3608},
	{x: 0.5594, y: 0.6906, z: -0.4585},
	{x: 0.6260, y: 0.7356, z: -0.2588},
	{x: 0.7031, y: 0.6952, z: 0.1496},
	{x: 0.4621, y: -0.1997, z: 0.8640},
	{x: 0.5381, y: 0.8103, z: -0.2322},
	{x: 0.6084, y: 0.7806, z: -0.1430},
	{x: 0.5820, y: 0.8127, z: -0.0279},
	{x: 0.6463, y: 0.7606, z: 0.0617},
	{x: 0.5501, y: 0.8307, z: 0.0855},
	{x: 0.5624, y: -0.2132, z: 0.7989},
	{x: 0.6640, y: 0.7017, z: 0.2585},
	{x: 0.7224, y: -0.6868, z: 0.0807},
	{x: -0.0298, y: 0.3762, z: -0.9261},
	{x: 0.5645, y: 0.6711, z: 0.4806},
	{x: 0.4687, y: 0.7228, z: 0.5077},
	{x: 0.6256, y: 0.5636, z: 0.5394},
	{x: 0.5548, y: 0.5351, z: 0.6371},
	{x: -0.4648, y: 0.8330, z: 0.3002},
	{x: 0.4522, y: 0.5876, z: 0.6709},
	{x: 0.3754, y: 0.5376, z: 0.7550},
	{x: 0.4077, y: 0.4334, z: 0.8037},
	{x: 0.0966, y: 0.4429, z: 0.8914},
	{x: -0.0566, y: -0.9558, z: 0.2885},
	{x: 0.1077, y: 0.0948, z: -0.9897},
	{x: 0.2017, y: 0.4148, z: -0.8873},
	{x: 0.5197, y: 0.4436, z: -0.7302},
	{x: 0.2489, y: 0.6064, z: -0.7552},
	{x: 0.2711, y: 0.6883, z: -0.6729},
	{x: 0.3592, y: 0.6144, z: -0.7025},
	{x: 0.3791, y: 0.6935, z: -0.6126},
	{x: 0.2903, y: 0.7607, z: -0.5805},
	{x: 0.3883, y: 0.7669, z: -0.5109},
	{x: 0.3818, y: 0.8329, z: -0.4007},
	{x: 0.3598, y: 0.8862, z: -0.2918},
	{x: 0.4628, y: 0.8271, z: -0.3188},
	{x: -0.1835, y: 0.3060, z: 0.9342},
	{x: 0.4391, y: 0.8744, z: -0.2065},
	{x: 0.5134, y: 0.8500, z: -0.1180},
	{x: 0.4820, y: 0.8762, z: -0.0044},
	{x: 0.4840, y: -0.3078, z: 0.8191},
	{x: 0.1280, y: 0.3348, z: 0.9335},
	{x: 0.5120, y: 0.8358, z: 0.1982},
	{x: 0.4699, y: 0.8258, z: 0.3118},
	{x: 0.3654, y: 0.8692, z: 0.3332},
	{x: 0.4230, y: 0.8014, z: 0.4230},
	{x: 0.5220, y: 0.6279, z: 0.5773},
	{x: 0.3662, y: 0.7653, z: 0.5294},
	{x: 0.2580, y: 0.7980, z: 0.5447},
	{x: 0.3434, y: 0.6325, z: 0.6943},
	{x: 0.4017, y: -0.7699, z: 0.4959},
	{x: 0.2640, y: 0.5758, z: 0.7738},
	{x: 0.2969, y: 0.4765, z: 0.8275},
	{x: 0.2130, y: 0.4087, z: 0.8875},
	{x: 0.1571, y: 0.2192, z: 0.9630},
	{x: 0.0338, y: 0.1872, z: -0.9817},
	{x: 0.1778, y: 0.3110, z: -0.9336},
	{x: 0.6041, y: -0.7333, z: -0.3119},
	{x: 0.1352, y: 0.5942, z: -0.7929},
	{x: -0.5395, y: -0.4109, z: -0.7349},
	{x: 0.1568, y: 0.6791, z: -0.7171},
	{x: 0.1087, y: -0.6415, z: -0.7594},
	{x: 0.1768, y: 0.7534, z: -0.6333},
	{x: 0.0925, y: -0.5496, z: -0.8303},
	{x: 0.2947, y: 0.8282, z: -0.4767},
	{x: -0.7825, y: 0.1475, z: -0.6049},
	{x: 0.2749, y: 0.8865, z: -0.3722},
	{x: 0.7211, y: -0.3034, z: -0.6228},
	{x: 0.3303, y: 0.9261, z: -0.1825},
	{x: 0.3376, y: 0.9323, z: 0.1298},
	{x: 0.2606, y: 0.9647, z: 0.0375},
	{x: 0.4078, y: 0.8857, z: 0.2218},
	{x: 0.2982, y: 0.9237, z: 0.2406},
	{x: -0.2396, y: 0.4107, z: -0.8797},
	{x: 0.8711, y: 0.1783, z: -0.4575},
	{x: 0.2562, y: 0.9013, z: 0.3492},
	{x: 0.2108, y: 0.8654, z: 0.4546},
	{x: 0.3189, y: 0.8386, z: 0.4417},
	{x: 0.1450, y: 0.8198, z: 0.5540},
	{x: 0.7000, y: -0.5315, z: 0.4770},
	{x: 0.3049, y: 0.7191, z: 0.6244},
	{x: 0.2295, y: 0.6664, z: 0.7094},
	{x: 0.1898, y: 0.7478, z: 0.6362},
	{x: 0.1472, y: 0.6066, z: 0.7813},
	{x: 0.0623, y: 0.5436, z: 0.8370},
	{x: 0.0763, y: 0.1349, z: 0.9879},
	{x: 0.0624, y: 0.2954, z: -0.9533},
	{x: 0.0871, y: 0.4001, z: -0.9123},
	{x: 0.3691, y: -0.8047, z: -0.4650},
	{x: -0.0480, y: 0.7293, z: -0.6825},
	{x: -0.6396, y: 0.7299, z: 0.2411},
	{x: 0.0646, y: 0.7522, z: -0.6557},
	{x: 0.8438, y: -0.4136, z: -0.3420},
	{x: 0.0872, y: 0.8233, z: -0.5609},
	{x: 0.0781, y: 0.8946, z: -0.4400},
	{x: 0.1588, y: 0.9243, z: -0.3471},
	{x: 0.0424, y: 0.9421, z: -0.3328},
	{x: 0.1262, y: 0.9618, z: -0.2430},
	{x: 0.2466, y: 0.9318, z: -0.2665},
	{x: 0.2133, y: 0.9639, z: -0.1597},
	{x: 0.0913, y: 0.9865, z: -0.1361},
	{x: 0.2965, y: 0.9523, z: -0.0727},
	{x: -0.0677, y: 0.9977, z: -0.0047},
	{x: 0.1780, y: 0.9827, z: -0.0517},
	{x: 0.7488, y: 0.0605, z: 0.6601},
	{x: 0.2231, y: 0.9636, z: 0.1471},
	{x: 0.1033, y: 0.9811, z: 0.1636},
	{x: 0.1427, y: 0.9218, z: 0.3604},
	{x: 0.0997, y: 0.8810, z: 0.4625},
	{x: 0.0641, y: 0.9612, z: 0.2682},
	{x: 0.0694, y: 0.7668, z: 0.6382},
	{x: -0.0169, y: 0.7166, z: 0.6972},
	{x: 0.1103, y: 0.6919, z: 0.7135},
	{x: -0.0998, y: 0.6557, z: 0.7484},
	{x: -0.0584, y: 0.5691, z: 0.8202},
	{x: -0.0211, y: 0.4718, z: 0.8815},
	{x: 0.0124, y: 0.3659, z: 0.9306},
	{x: 0.0450, y: 0.2541, z: 0.9661},
	{x: -0.0551, y: 0.2675, z: -0.9620},
	{x: -0.0040, y: 0.4795, z: -0.8775},
	{x: -0.0673, y: 0.6417, z: -0.7640},
	{x: -0.6821, y: 0.7297, z: 0.0471},
	{x: -0.1518, y: 0.7000, z: -0.6979},
	{x: -0.0348, y: 0.8001, z: -0.5989},
	{x: 0.6401, y: -0.2910, z: -0.7110},
	{x: -0.1488, y: 0.7913, z: -0.5930},
	{x: -0.1151, y: 0.8558, z: -0.5043},
	{x: -0.0421, y: 0.9104, z: -0.4115},
	{x: -0.1567, y: 0.9040, z: -0.3978},
	{x: -0.1948, y: 0.9369, z: -0.2904},
	{x: -0.1145, y: 0.9729, z: -0.2008},
	{x: -0.1515, y: 0.9843, z: -0.0910},
	{x: -0.4692, y: 0.0630, z: -0.8808},
	{x: 0.4747, y: 0.6953, z: -0.5396},
	{x: -0.1885, y: 0.9819, z: 0.0205},
	{x: -0.1057, y: 0.9887, z: 0.1060},
	{x: 0.0169, y: 0.9965, z: 0.0814},
	{x: -0.1837, y: 0.9266, z: 0.3282},
	{x: -0.0634, y: 0.9527, z: 0.2971},
	{x: -0.1039, y: 0.9096, z: 0.4023},
	{x: -0.0142, y: 0.8852, z: 0.4651},
	{x: 0.0264, y: 0.8309, z: 0.5557},
	{x: -0.1031, y: 0.8475, z: 0.5207},
	{x: 0.2068, y: -0.6779, z: -0.7054},
	{x: -0.0618, y: 0.7868, z: 0.6141},
	{x: -0.1801, y: 0.5848, z: 0.7909},
	{x: -0.1393, y: 0.4940, z: 0.8583},
	{x: -0.8438, y: -0.4630, z: 0.2714},
	{x: -0.0364, y: 0.1688, z: 0.9850},
	{x: -0.1683, y: 0.2374, z: -0.9567},
	{x: -0.1216, y: 0.4501, z: -0.8847},
	{x: -0.0947, y: 0.5487, z: -0.8306},
	{x: -0.1829, y: 0.6088, z: -0.7720},
	{x: -0.2701, y: 0.6536, z: -0.7070},
	{x: -0.2340, y: 0.7372, z: -0.6338},
	{x: -0.2850, y: 0.7855, z: -0.5493},
	{x: -0.2225, y: 0.8469, z: -0.4830},
	{x: -0.3395, y: 0.8249, z: -0.4521},
	{x: -0.2707, y: 0.8862, z: -0.3760},
	{x: -0.3087, y: 0.9128, z: -0.2675},
	{x: -0.2318, y: 0.9559, z: -0.1801},
	{x: -0.3451, y: 0.9257, z: -0.1548},
	{x: 0.7136, y: 0.2696, z: 0.6466},
	{x: -0.2687, y: 0.9609, z: -0.0675},
	{x: -0.3047, y: 0.9513, z: 0.0460},
	{x: -0.4148, y: 0.9067, z: 0.0758},
	{x: -0.2251, y: 0.9653, z: 0.1326},
	{x: -0.2586, y: 0.9338, z: 0.2473},
	{x: -0.3581, y: 0.8912, z: 0.2785},
	{x: -0.1636, y: -0.1226, z: 0.9789},
	{x: -0.1991, y: 0.8678, z: 0.4554},
	{x: -0.2778, y: 0.8831, z: 0.3781},
	{x: 0.4746, y: 0.7669, z: -0.4320},
	{x: -0.2832, y: 0.8148, z: 0.5058},
	{x: -0.1437, y: 0.7314, z: 0.6667},
	{x: 0.9489, y: 0.1232, z: 0.2906},
	{x: -0.2233, y: 0.6642, z: 0.7134},
	{x: 0.9079, y: -0.0710, z: 0.4131},
	{x: -0.1030, y: 0.3920, z: 0.9142},
	{x: -0.2626, y: 0.2148, z: 0.9407},
	{x: -0.0787, y: 0.1501, z: -0.9855},
	{x: -0.1468, y: 0.3464, z: -0.9265},
	{x: -0.2126, y: 0.5126, z: -0.8319},
	{x: -0.3017, y: 0.5626, z: -0.7697},
	{x: 0.7844, y: 0.6069, z: 0.1284},
	{x: -0.9995, y: 0.0320, z: 0.0087},
	{x: -0.3459, y: 0.7023, z: -0.6222},
	{x: -0.4518, y: 0.6594, z: -0.6009},
	{x: -0.3995, y: 0.7489, z: -0.5287},
	{x: -0.6044, y: 0.6423, z: -0.4713},
	{x: -0.3851, y: 0.8548, z: -0.3480},
	{x: -0.4935, y: 0.8081, z: -0.3216},
	{x: -0.5209, y: 0.8268, z: -0.2124},
	{x: -0.4186, y: 0.8759, z: -0.2399},
	{x: -0.4534, y: 0.8824, z: -0.1258},
	{x: -0.3813, y: 0.9236, z: -0.0401},
	{x: 0.8824, y: 0.2712, z: -0.3845},
	{x: -0.4876, y: 0.8730, z: -0.0091},
	{x: -0.5171, y: 0.8490, z: 0.1084},
	{x: -0.3372, y: 0.9276, z: 0.1607},
	{x: -0.0030, y: 0.8608, z: -0.5089},
	{x: -0.4804, y: 0.7781, z: 0.4048},
	{x: -0.3848, y: 0.7901, z: 0.4771},
	{x: -0.3625, y: 0.7348, z: 0.5733},
	{x: -0.9911, y: -0.0428, z: 0.1264},
	{x: -0.2609, y: 0.7375, z: 0.6229},
	{x: -0.8758, y: 0.0725, z: 0.4772},
	{x: -0.3400, y: 0.6627, z: 0.6673},
	{x: -0.2590, y: 0.5067, z: 0.8223},
	{x: -0.2188, y: 0.4123, z: 0.8844},
	{x: -0.4272, y: 0.0449, z: 0.9030},
	{x: -0.1884, y: 0.1246, z: -0.9742},
	{x: -0.2628, y: 0.3033, z: -0.9159},
	{x: -0.3299, y: 0.4643, z: -0.8220},
	{x: -0.4140, y: 0.5157, z: -0.7501},
	{x: -0.5188, y: 0.4615, z: -0.7196},
	{x: -0.4888, y: 0.5637, z: -0.6658},
	{x: -0.5520, y: 0.6068, z: -0.5719},
	{x: -0.5055, y: 0.7006, z: -0.5036},
	{x: -0.5509, y: 0.7323, z: -0.4002},
	{x: -0.5957, y: 0.7486, z: -0.2910},
	{x: -0.6453, y: 0.6707, z: -0.3657},
	{x: -0.8289, y: -0.0099, z: 0.5594},
	{x: -0.6927, y: 0.6750, z: -0.2543},
	{x: -0.6143, y: 0.7677, z: -0.1827},
	{x: -0.7910, y: 0.5591, z: -0.2484},
	{x: -0.5542, y: 0.8269, z: -0.0952},
	{x: -0.5859, y: 0.8100, z: 0.0240},
	{x: -0.4533, y: -0.0577, z: -0.8895},
	{x: 0.6376, y: 0.6041, z: -0.4781},
	{x: -0.7078, y: 0.6893, z: 0.1545},
	{x: -0.5447, y: 0.8099, z: 0.2176},
	{x: -0.5635, y: 0.7597, z: 0.3244},
	{x: -0.6487, y: 0.6762, z: 0.3492},
	{x: -0.4726, y: 0.7186, z: 0.5102},
	{x: -0.5540, y: 0.6387, z: 0.5340},
	{x: -0.3829, y: 0.6125, z: -0.6916},
	{x: -0.4975, y: 0.4979, z: 0.7104},
	{x: -0.4209, y: 0.5839, z: 0.6942},
	{x: -0.3816, y: 0.5073, z: 0.7727},
	{x: -0.3364, y: 0.4241, z: 0.8408},
	{x: -0.2959, y: 0.3258, z: 0.8979},
	{x: 0.1060, y: 0.0120, z: 0.9943},
	{x: -0.2818, y: 0.1905, z: -0.9404},
	{x: 0.7198, y: -0.5001, z: -0.4814},
	{x: -0.3544, y: 0.3592, z: -0.8634},
	{x: -0.4612, y: 0.3020, z: -0.8343},
	{x: -0.1872, y: 0.7990, z: 0.5714},
	{x: 0.0066, y: 0.9744, z: -0.2246},
	{x: -0.5881, y: 0.5058, z: -0.6311},
	{x: -0.6458, y: 0.5454, z: -0.5344},
	{x: -0.7332, y: 0.4808, z: -0.4809},
	{x: -0.6967, y: 0.5739, z: -0.4305},
	{x: -0.6806, y: 0.4421, z: -0.5843},
	{x: -0.7701, y: 0.6184, z: -0.1565},
	{x: -0.7310, y: 0.5983, z: -0.3281},
	{x: -0.6972, y: 0.7015, z: -0.1480},
	{x: -0.8101, y: 0.5847, z: -0.0434},
	{x: -0.7372, y: 0.6743, z: -0.0438},
	{x: -0.3344, y: -0.1017, z: -0.9369},
	{x: -0.7666, y: 0.6391, z: 0.0624},
	{x: -0.7412, y: -0.5639, z: -0.3643},
	{x: -0.7217, y: 0.6405, z: 0.2625},
	{x: -0.7238, y: 0.5834, z: 0.3684},
	{x: -0.9242, y: 0.3810, z: -0.0272},
	{x: -0.6450, y: 0.6148, z: 0.4538},
	{x: -0.6281, y: 0.5486, z: 0.5519},
	{x: 0.2056, y: -0.0969, z: -0.9738},
	{x: 0.6931, y: 0.7010, z: -0.1678},
	{x: -0.5647, y: 0.4003, z: 0.7217},
	{x: -0.4563, y: 0.4197, z: 0.7846},
	{x: -0.4489, y: 0.7844, z: -0.4280},
	{x: -0.4093, y: 0.3354, z: 0.8485},
	{x: -0.1534, y: 0.1925, z: 0.9692},
	{x: 0.9774, y: 0.1726, z: -0.1217},
	{x: -0.3738, y: 0.2477, z: -0.8938},
	{x: -0.5558, y: 0.2381, z: -0.7965},
	{x: -0.4485, y: 0.6571, z: 0.6059},
	{x: -0.5422, y: 0.3535, z: -0.7623},
	{x: -0.6160, y: 0.4004, z: -0.6784},
	{x: -0.7147, y: 0.2203, z: -0.6638},
	{x: -0.7610, y: 0.3699, z: -0.5329},
	{x: -0.8039, y: 0.4078, z: -0.4329},
	{x: -0.8970, y: 0.2891, z: -0.3343},
	{x: -0.9045, y: 0.3564, z: -0.2344},
	{x: -0.8549, y: 0.3924, z: -0.3395},
	{x: -0.2367, y: -0.5384, z: -0.8088},
	{x: -0.8956, y: 0.4231, z: -0.1376},
	{x: 0.4088, y: 0.9077, z: -0.0944},
	{x: -0.8734, y: 0.4859, z: -0.0326},
	{x: -0.8937, y: 0.4420, z: 0.0773},
	{x: -0.8359, y: 0.5446, z: 0.0684},
	{x: -0.9010, y: 0.3919, z: 0.1862},
	{x: -0.8491, y: 0.4971, z: 0.1785},
	{x: -0.8404, y: 0.3770, z: 0.3894},
	{x: -0.7924, y: 0.5433, z: 0.2773},
	{x: -0.8509, y: 0.4406, z: 0.2861},
	{x: -0.7880, y: 0.4832, z: 0.3816},
	{x: -0.7722, y: 0.4150, z: 0.4811},
	{x: -0.7451, y: 0.3405, z: 0.5736},
	{x: -0.6923, y: 0.4484, z: 0.5653},
	{x: -0.6191, y: 0.2914, z: 0.7292},
	{x: 0.7103, y: 0.1674, z: 0.6838},
	{x: 0.2117, y: -0.8454, z: 0.4905},
	{x: 0.3399, y: -0.8830, z: 0.3237},
	{x: -0.0055, y: 0.0495, z: 0.9988},
	{x: -0.1348, y: 0.0302, z: -0.9904},
	{x: -0.2808, y: 0.0672, z: -0.9574},
	{x: -0.4711, y: 0.1843, z: -0.8626},
	{x: -0.6328, y: 0.2882, z: -0.7187},
	{x: -0.6413, y: 0.1710, z: -0.7480},
	{x: -0.7022, y: 0.3322, z: -0.6297},
	{x: -0.7815, y: 0.2631, z: -0.5657},
	{x: 0.1412, y: 0.9884, z: 0.0565},
	{x: -0.8376, y: 0.3025, z: -0.4548},
	{x: -0.8880, y: 0.2086, z: -0.4098},
	{x: -0.2688, y: -0.9286, z: 0.2560},
	{x: -0.9349, y: 0.1658, z: -0.3137},
	{x: -0.9410, y: 0.3133, z: -0.1283},
	{x: -0.9628, y: 0.2694, z: -0.0203},
	{x: -0.1435, y: -0.4813, z: -0.8647},
	{x: -0.9390, y: 0.3339, z: 0.0824},
	{x: -0.9716, y: 0.2199, z: 0.0875},
	{x: -0.9058, y: 0.0963, z: -0.4125},
	{x: -0.9403, y: 0.2819, z: 0.1905},
	{x: -0.8970, y: 0.3316, z: 0.2922},
	{x: -0.7140, y: 0.5188, z: 0.4702},
	{x: -0.8804, y: 0.2655, z: 0.3930},
	{x: -0.8184, y: 0.3052, z: 0.4868},
	{x: -0.8528, y: 0.1904, z: 0.4863},
	{x: -0.7856, y: 0.2265, z: 0.5757},
	{x: -0.7483, y: -0.2219, z: -0.6251},
	{x: -0.6596, y: 0.1761, z: 0.7307},
	{x: -0.5678, y: 0.2059, z: 0.7970},
	{x: -0.4902, y: 0.1264, z: 0.8624},
	{x: -0.3696, y: 0.2330, z: 0.8995},
	{x: -0.6277, y: -0.7784, z: 0.0020},
	{x: 0.0688, y: -0.9925, z: -0.1015},
	{x: -0.3692, y: 0.0059, z: -0.9293},
	{x: -0.5520, y: -0.0031, z: -0.8338},
	{x: -0.7153, y: 0.0994, z: -0.6917},
	{x: 0.0547, y: 0.9981, z: -0.0277},
	{x: -0.7807, y: 0.0274, z: -0.6243},
	{x: -0.8422, y: 0.1859, z: -0.5060},
	{x: -0.8438, y: 0.0767, z: -0.5312},
	{x: -0.9700, y: -0.1392, z: 0.1994},
	{x: 0.0243, y: 0.9292, z: 0.3687},
	{x: 0.3428, y: 0.1021, z: -0.9338},
	{x: -0.9698, y: 0.1217, z: -0.2112},
	{x: -0.9796, y: 0.0023, z: -0.2008},
	{x: -0.9726, y: 0.1985, z: -0.1212},
	{x: -0.9426, y: 0.2438, z: -0.2284},
	{x: -0.9881, y: 0.1531, z: -0.0128},
	{x: -0.9906, y: 0.0993, z: 0.0943},
	{x: -0.9668, y: 0.1671, z: 0.1932},
	{x: -0.9525, y: 0.0954, z: 0.2891},
	{x: 0.1838, y: 0.9493, z: 0.2551},
	{x: -0.0779, y: 0.9482, z: -0.3079},
	{x: -0.9266, y: 0.0310, z: 0.3748},
	{x: -0.8141, y: 0.1087, z: 0.5705},
	{x: -0.7419, y: 0.1432, z: 0.6551},
	{x: -0.6837, y: 0.0592, z: 0.7274},
	{x: -0.5944, y: 0.0936, z: 0.7987},
	{x: -0.5288, y: 0.0106, z: 0.8487},
	{x: 0.1947, y: 0.8177, z: -0.5418},
	{x: -0.1203, y: 0.0842, z: 0.9892},
	{x: -0.2392, y: -0.0348, z: -0.9703},
	{x: -0.5331, y: -0.1214, z: -0.8373},
	{x: -0.6274, y: -0.0729, z: -0.7752},
	{x: -0.7094, y: -0.0238, z: -0.7044},
	{x: -0.2971, y: -0.8401, z: 0.4539},
	{x: -0.6603, y: 0.3729, z: 0.6519},
	{x: -0.8314, y: -0.0490, z: -0.5535},
	{x: -0.8868, y: -0.0000, z: -0.4622},
	{x: -0.8782, y: -0.1168, z: -0.4637},
	{x: 0.2250, y: 0.5151, z: -0.8271},
	{x: -0.9284, y: -0.0423, z: -0.3691},
	{x: -0.9590, y: -0.0857, z: -0.2702},
	{x: -0.9849, y: -0.1664, z: -0.0485},
	{x: -0.9949, y: -0.0415, z: -0.0921},
	{x: -0.9967, y: -0.0784, z: 0.0190},
	{x: 0.9727, y: 0.2020, z: 0.1144},
	{x: -0.9371, y: -0.1745, z: 0.3022},
	{x: -0.9805, y: 0.0459, z: 0.1910},
	{x: -0.9204, y: -0.2783, z: 0.2745},
	{x: -0.9306, y: -0.0793, z: 0.3573},
	{x: -0.9648, y: -0.0392, z: 0.2600},
	{x: -0.8851, y: -0.0446, z: 0.4633},
	{x: -0.8366, y: -0.1300, z: 0.5322},
	{x: -0.7741, y: -0.0963, z: 0.6257},
	{x: -0.7063, y: -0.1805, z: 0.6845},
	{x: -0.7017, y: -0.0616, z: 0.7098},
	{x: -0.6282, y: -0.1448, z: 0.7645},
	{x: -0.6198, y: -0.0262, z: 0.7843},
	{x: -0.3585, y: 0.1286, z: 0.9247},
	{x: -0.3286, y: 0.0095, z: 0.9444},
	{x: 0.8513, y: -0.5228, z: -0.0450},
	{x: -0.4221, y: -0.1687, z: -0.8907},
	{x: -0.5033, y: -0.2328, z: -0.8322},
	{x: -0.6043, y: -0.1916, z: -0.7734},
	{x: -0.6916, y: -0.1479, z: -0.7070},
	{x: -0.6676, y: -0.2657, z: -0.6955},
	{x: -0.8182, y: -0.1718, z: -0.5486},
	{x: -0.7756, y: -0.6312, z: 0.0074},
	{x: -0.6004, y: 0.4779, z: 0.6413},
	{x: -0.8319, y: -0.3501, z: -0.4305},
	{x: -0.3776, y: 0.8432, z: 0.3827},
	{x: -0.8932, y: -0.2817, z: -0.3505},
	{x: -0.9782, y: -0.1271, z: -0.1639},
	{x: -0.9244, y: -0.3568, z: -0.1348},
	{x: -0.9602, y: -0.2740, z: -0.0540},
	{x: -0.9615, y: -0.2691, z: 0.0556},
	{x: -0.9266, y: -0.3759, z: -0.0130},
	{x: -0.9027, y: -0.3726, z: 0.2154},
	{x: 0.2015, y: -0.9477, z: -0.2474},
	{x: 0.1105, y: -0.9386, z: -0.3268},
	{x: -0.8668, y: -0.3693, z: 0.3352},
	{x: -0.8844, y: -0.2638, z: 0.3851},
	{x: -0.8896, y: -0.1607, z: 0.4275},
	{x: -0.8336, y: -0.2439, z: 0.4956},
	{x: 0.5379, y: -0.1063, z: 0.8363},
	{x: -0.7747, y: -0.2142, z: 0.5950},
	{x: -0.7018, y: -0.2963, z: 0.6478},
	{x: -0.6280, y: -0.2618, z: 0.7329},
	{x: -0.4426, y: -0.0642, z: 0.8944},
	{x: 0.6113, y: 0.7722, z: 0.1734},
	{x: -0.1982, y: 0.0016, z: 0.9802},
	{x: -0.1339, y: -0.0907, z: -0.9868},
	{x: -0.3793, y: 0.1278, z: -0.9164},
	{x: -0.1804, y: -0.8800, z: 0.4394},
	{x: -0.5759, y: -0.3033, z: -0.7592},
	{x: 0.7352, y: 0.2167, z: -0.6424},
	{x: -0.6361, y: -0.3771, z: -0.6732},
	{x: -0.7958, y: -0.2903, z: -0.5314},
	{x: -0.7210, y: -0.3377, z: -0.6051},
	{x: -0.9307, y: 0.2172, z: 0.2944},
	{x: -0.7612, y: -0.4045, z: -0.5069},
	{x: -0.8583, y: -0.3969, z: -0.3252},
	{x: -0.9143, y: -0.3224, z: -0.2452},
	{x: -0.8131, y: -0.5043, z: -0.2908},
	{x: -0.8751, y: -0.4339, z: -0.2143},
	{x: -0.8841, y: -0.4579, z: -0.0937},
	{x: -0.8714, y: -0.4668, z: 0.1507},
	{x: -0.3026, y: 0.5880, z: 0.7501},
	{x: -0.7077, y: -0.7044, z: -0.0539},
	{x: -0.3130, y: -0.2184, z: -0.9243},
	{x: -0.8266, y: -0.5567, z: 0.0824},
	{x: -0.7736, y: -0.5440, z: 0.3250},
	{x: -0.8018, y: -0.4522, z: 0.3907},
	{x: -0.6672, y: -0.5077, z: 0.5451},
	{x: -0.8229, y: -0.3505, z: 0.4473},
	{x: -0.7503, y: -0.4324, z: 0.5001},
	{x: -0.7666, y: -0.3271, z: 0.5525},
	{x: -0.6882, y: -0.4058, z: 0.6014},
	{x: -0.6170, y: -0.3734, z: 0.6928},
	{x: -0.5370, y: -0.3379, z: 0.7730},
	{x: -0.5454, y: -0.2249, z: 0.8074},
	{x: -0.3614, y: -0.1311, z: 0.9231},
	{x: 0.1862, y: 0.0975, z: 0.9777},
	{x: 0.8099, y: -0.5151, z: -0.2805},
	{x: -0.2807, y: -0.3295, z: -0.9015},
	{x: -0.4734, y: -0.3426, z: -0.8115},
	{x: -0.3602, y: -0.3954, z: -0.8449},
	{x: -0.4335, y: -0.4484, z: -0.7816},
	{x: -0.5851, y: -0.4816, z: -0.6524},
	{x: -0.6810, y: -0.4477, z: -0.5795},
	{x: -0.6209, y: -0.5448, z: -0.5637},
	{x: -0.7157, y: -0.5108, z: -0.4762},
	{x: -0.7912, y: -0.4614, z: -0.4015},
	{x: -0.6655, y: -0.6451, z: -0.3753},
	{x: -0.7621, y: -0.5995, z: -0.2445},
	{x: -0.8287, y: -0.5328, z: -0.1714},
	{x: -0.7750, y: -0.6207, z: -0.1193},
	{x: -0.8350, y: -0.5484, z: -0.0452},
	{x: -0.8828, y: -0.4686, z: 0.0328},
	{x: -0.7045, y: -0.7067, z: 0.0651},
	{x: -0.8401, y: 0.5232, z: -0.1429},
	{x: -0.8082, y: -0.5522, z: 0.2048},
	{x: -0.7595, y: -0.6360, z: 0.1368},
	{x: -0.7332, y: -0.6300, z: 0.2561},
	{x: -0.7251, y: -0.5308, z: 0.4387},
	{x: -0.6918, y: -0.6209, z: 0.3687},
	{x: -0.6386, y: -0.6019, z: 0.4795},
	{x: 0.1816, y: 0.5116, z: 0.8398},
	{x: -0.5742, y: -0.5752, z: 0.5825},
	{x: -0.5987, y: -0.4782, z: 0.6425},
	{x: -0.4409, y: 0.8767, z: 0.1926},
	{x: -0.4493, y: -0.2979, z: 0.8423},
	{x: -0.3440, y: -0.3610, z: 0.8668},
	{x: -0.4554, y: -0.1837, z: 0.8711},
	{x: 0.7060, y: 0.6205, z: 0.3414},
	{x: -0.6464, y: 0.7605, z: -0.0609},
	{x: -0.4609, y: -0.8136, z: 0.3545},
	{x: -0.3483, y: -0.5175, z: -0.7816},
	{x: -0.4801, y: -0.5154, z: -0.7098},
	{x: 0.3855, y: -0.7280, z: -0.5670},
	{x: -0.4433, y: -0.6686, z: -0.5970},
	{x: -0.5190, y: -0.5817, z: -0.6263},
	{x: -0.5484, y: -0.6422, z: -0.5355},
	{x: -0.5706, y: -0.6948, z: -0.4377},
	{x: -0.5131, y: -0.8117, z: -0.2790},
	{x: -0.5910, y: -0.7350, z: -0.3325},
	{x: -0.6851, y: -0.6748, z: -0.2745},
	{x: -0.6104, y: -0.7600, z: -0.2233},
	{x: -0.6443, y: -0.7063, z: 0.2932},
	{x: -0.7009, y: -0.6934, z: -0.1673},
	{x: -0.5393, y: -0.8408, z: -0.0467},
	{x: -0.6223, y: -0.7738, z: 0.1186},
	{x: -0.5425, y: -0.8367, z: 0.0749},
	{x: 0.7420, y: -0.5628, z: 0.3643},
	{x: -0.6775, y: -0.7108, z: 0.1891},
	{x: -0.5568, y: -0.7671, z: 0.3186},
	{x: -0.5666, y: 0.7014, z: 0.4324},
	{x: -0.8503, y: 0.4630, z: -0.2501},
	{x: -0.5432, y: -0.6640, z: 0.5138},
	{x: -0.4163, y: -0.5091, z: 0.7533},
	{x: -0.3917, y: -0.6049, z: 0.6933},
	{x: -0.3268, y: -0.4665, z: 0.8219},
	{x: -0.2322, y: -0.4163, z: 0.8791},
	{x: -0.3562, y: -0.2496, z: 0.9005},
	{x: -0.2583, y: -0.1983, z: 0.9455},
	{x: -0.0369, y: -0.0324, z: -0.9988},
	{x: -0.1693, y: -0.3769, z: -0.9106},
	{x: -0.2599, y: -0.4420, z: -0.8585},
	{x: -0.4085, y: -0.5972, z: -0.6903},
	{x: -0.3053, y: -0.6128, z: -0.7289},
	{x: -0.3658, y: -0.7533, z: -0.5466},
	{x: -0.9087, y: 0.1493, z: 0.3898},
	{x: -0.4702, y: -0.7288, z: -0.4977},
	{x: -0.3903, y: -0.8069, z: -0.4434},
	{x: 0.7702, y: -0.5864, z: 0.2510},
	{x: -0.4928, y: -0.7773, z: -0.3912},
	{x: -0.4120, y: -0.8481, z: -0.3331},
	{x: -0.5297, y: -0.8322, z: -0.1641},
	{x: -0.4403, y: 0.4121, z: -0.7977},
	{x: -0.4436, y: -0.8906, z: -0.1009},
	{x: -0.5405, y: -0.1069, z: 0.8345},
	{x: -0.4518, y: -0.8919, z: 0.0188},
	{x: -0.4301, y: -0.8760, z: -0.2182},
	{x: -0.4708, y: -0.8469, z: 0.2473},
	{x: -0.3706, y: -0.9051, z: 0.2085},
	{x: -0.3700, y: -0.8702, z: 0.3252},
	{x: -0.5663, y: -0.7973, z: 0.2086},
	{x: -0.5071, y: -0.7436, z: 0.4359},
	{x: 0.7099, y: -0.6764, z: 0.1961},
	{x: -0.4382, y: -0.7243, z: 0.5323},
	{x: -0.4713, y: -0.6390, z: 0.6079},
	{x: -0.3625, y: -0.6928, z: 0.6234},
	{x: -0.2775, y: -0.6581, z: 0.6999},
	{x: -0.3046, y: -0.5659, z: 0.7661},
	{x: -0.2131, y: -0.5183, z: 0.8282},
	{x: -0.2473, y: -0.3094, z: 0.9182},
	{x: -0.0222, y: 0.9815, z: 0.1900},
	{x: -0.0758, y: -0.3089, z: -0.9481},
	{x: 0.5416, y: 0.5314, z: -0.6514},
	{x: -0.9916, y: 0.0770, z: -0.1040},
	{x: -0.1140, y: -0.5796, z: -0.8069},
	{x: -0.1952, y: -0.6296, z: -0.7520},
	{x: -0.2553, y: -0.7698, z: -0.5850},
	{x: 0.1120, y: 0.5000, z: -0.8588},
	{x: -0.1665, y: -0.8309, z: -0.5310},
	{x: -0.2817, y: -0.8264, z: -0.4875},
	{x: -0.2164, y: -0.9231, z: -0.3178},
	{x: -0.3056, y: -0.8724, z: -0.3815},
	{x: -0.3258, y: -0.9064, z: -0.2689},
	{x: -0.1397, y: -0.9814, z: -0.1314},
	{x: -0.3417, y: -0.9274, z: -0.1519},
	{x: 0.3688, y: -0.9256, z: 0.0851},
	{x: -0.3534, y: -0.9349, z: -0.0320},
	{x: -0.7076, y: 0.2605, z: 0.6568},
	{x: -0.2484, y: -0.9649, z: -0.0853},
	{x: -0.2651, y: -0.9531, z: 0.1462},
	{x: -0.3643, y: -0.9269, z: 0.0900},
	{x: -0.2692, y: -0.8925, z: 0.3620},
	{x: -0.3948, y: -0.2837, z: -0.8738},
	{x: -0.9503, y: 0.0483, z: -0.3074},
	{x: -0.3290, y: -0.7715, z: 0.5445},
	{x: -0.2137, y: -0.8165, z: 0.5362},
	{x: -0.2461, y: -0.7419, z: 0.6237},
	{x: 0.9062, y: 0.1385, z: 0.3996},
	{x: -0.1889, y: -0.6144, z: 0.7661},
	{x: -0.0981, y: -0.5588, z: 0.8235},
	{x: -0.1183, y: -0.4584, z: 0.8808},
	{x: -0.1353, y: -0.3521, z: 0.9261},
	{x: 0.0475, y: -0.3508, z: -0.9352},
	{x: -0.0508, y: -0.4132, z: -0.9092},
	{x: -0.0245, y: -0.5115, z: -0.8589},
	{x: -0.9516, y: -0.2559, z: 0.1704},
	{x: -0.1051, y: -0.6875, z: -0.7185},
	{x: -0.2257, y: -0.7038, z: -0.6736},
	{x: -0.1380, y: -0.7662, z: -0.6276},
	{x: -0.0767, y: -0.8832, z: -0.4627},
	{x: 0.0175, y: -0.9175, z: -0.3974},
	{x: -0.1933, y: -0.8830, z: -0.4278},
	{x: -0.1029, y: -0.9276, z: -0.3592},
	{x: -0.0098, y: -0.9567, z: -0.2909},
	{x: -0.0292, y: -0.9840, z: -0.1756},
	{x: 0.8777, y: -0.0262, z: -0.4785},
	{x: -0.2347, y: -0.9507, z: -0.2029},
	{x: -0.1501, y: -0.9886, z: -0.0139},
	{x: 0.1662, y: -0.8336, z: -0.5267},
	{x: -0.0405, y: -0.9975, z: -0.0578},
	{x: -0.0508, y: -0.9834, z: 0.1740},
	{x: 0.0519, y: -0.9679, z: 0.2459},
	{x: -0.1557, y: -0.9826, z: 0.1017},
	{x: 0.0371, y: -0.9317, z: 0.3613},
	{x: -0.0723, y: -0.9124, z: 0.4028},
	{x: 0.0139, y: -0.8808, z: 0.4734},
	{x: -0.0967, y: -0.8531, z: 0.5127},
	{x: -0.0126, y: -0.8151, z: 0.5792},
	{x: -0.1289, y: -0.7833, z: 0.6082},
	{x: -0.0434, y: -0.7389, z: 0.6724},
	{x: -0.0726, y: -0.6528, z: 0.7541},
	{x: 0.0163, y: -0.5916, z: 0.8061},
	{x: -0.0223, y: -0.3890, z: 0.9209},
	{x: -0.0388, y: -0.2781, z: 0.9598},
	{x: -0.0018, y: -0.1375, z: -0.9905},
	{x: -0.0077, y: -0.6069, z: -0.7947},
	{x: 0.0061, y: -0.6891, z: -0.7246},
	{x: -0.0237, y: -0.7624, z: -0.6466},
	{x: -0.0498, y: -0.8280, z: -0.5586},
	{x: 0.0725, y: -0.8041, z: -0.5900},
	{x: 0.0220, y: 0.5772, z: -0.8163},
	{x: -0.1002, y: -0.1994, z: -0.9748},
	{x: 0.0457, y: -0.8667, z: -0.4967},
	{x: 0.1397, y: -0.8925, z: -0.4288},
	{x: 0.2301, y: -0.9080, z: -0.3500},
	{x: 0.0824, y: -0.9724, z: -0.2184},
	{x: 0.1784, y: -0.9732, z: -0.1449},
	{x: 0.0652, y: -0.9978, z: 0.0141},
	{x: -0.1635, y: -0.9306, z: 0.3275},
	{x: 0.1691, y: -0.9823, z: 0.0811},
	{x: 0.0590, y: -0.9898, z: 0.1300},
	{x: 0.1603, y: -0.9671, z: 0.1976},
	{x: -0.8609, y: -0.2341, z: -0.4517},
	{x: 0.1467, y: -0.9377, z: 0.3149},
	{x: 0.1258, y: -0.8945, z: 0.4290},
	{x: -0.5201, y: 0.3190, z: 0.7923},
	{x: 0.0987, y: -0.8378, z: 0.5370},
	{x: 0.1813, y: -0.7840, z: 0.5937},
	{x: 0.0708, y: -0.7659, z: 0.6390},
	{x: 0.1533, y: -0.7060, z: 0.6914},
	{x: 0.0418, y: -0.6832, z: 0.7290},
	{x: -0.0040, y: -0.4935, z: 0.8697},
	{x: 0.1100, y: -0.5226, z: 0.8455},
	{x: -0.0854, y: -0.0362, z: 0.9957},
	{x: -0.9573, y: -0.2404, z: -0.1603},
	{x: 0.0732, y: -0.4517, z: -0.8892},
	{x: 0.1894, y: -0.4854, z: -0.8535},
	{x: 0.2057, y: -0.5827, z: -0.7862},
	{x: 0.1020, y: -0.7311, z: -0.6746},
	{x: 0.1950, y: -0.7634, z: -0.6158},
	{x: 0.2848, y: -0.7876, z: -0.5464},
	{x: 0.9667, y: -0.2206, z: 0.1300},
	{x: 0.2556, y: -0.8537, z: -0.4537},
	{x: 0.3069, y: -0.9196, z: -0.2455},
	{x: -0.4356, y: -0.4065, z: 0.8032},
	{x: -0.9165, y: -0.1621, z: -0.3658},
	{x: 0.2811, y: -0.9530, z: -0.1128},
	{x: 0.2758, y: -0.9611, z: 0.0160},
	{x: -0.9243, y: -0.3671, z: 0.1047},
	{x: 0.1762, y: -0.9838, z: -0.0338},
	{x: 0.2670, y: -0.9536, z: 0.1392},
	{x: 0.2534, y: -0.9316, z: 0.2604},
	{x: 0.3572, y: -0.9113, z: 0.2049},
	{x: 0.2336, y: -0.2057, z: -0.9503},
	{x: -0.0703, y: 0.2818, z: 0.9569},
	{x: 0.2356, y: -0.8949, z: 0.3791},
	{x: 0.3205, y: -0.8390, z: 0.4397},
	{x: 0.2950, y: -0.7839, z: 0.5463},
	{x: 0.6090, y: 0.3156, z: 0.7276},
	{x: 0.2617, y: -0.7197, z: 0.6431},
	{x: 0.2373, y: -0.6364, z: 0.7340},
	{x: 0.3336, y: -0.5625, z: 0.7565},
	{x: 0.1285, y: -0.6175, z: 0.7760},
	{x: 0.0913, y: -0.4211, z: 0.9024},
	{x: -0.9823, y: -0.1656, z: 0.0874},
	{x: 0.1409, y: -0.2755, z: -0.9509},
	{x: 0.1674, y: -0.3825, z: -0.9087},
	{x: 0.2825, y: -0.4170, z: -0.8639},
	{x: 0.3002, y: -0.5178, z: -0.8011},
	{x: 0.3053, y: -0.6157, z: -0.7264},
	{x: 0.4160, y: 0.4393, z: -0.7962},
	{x: 0.3978, y: -0.6410, z: -0.6564},
	{x: 0.4836, y: -0.6581, z: -0.5771},
	{x: 0.3357, y: -0.8673, z: -0.3675},
	{x: 0.4483, y: -0.8108, z: -0.3764},
	{x: 0.3766, y: -0.9131, z: -0.1564},
	{x: 0.5231, y: -0.8049, z: -0.2802},
	{x: 0.4717, y: -0.8599, z: -0.1952},
	{x: 0.4709, y: -0.8785, z: -0.0807},
	{x: 0.5626, y: -0.8263, z: -0.0268},
	{x: 0.4680, y: -0.8831, z: 0.0342},
	{x: -0.2701, y: -0.0820, z: 0.9593},
	{x: 0.6463, y: -0.7581, z: -0.0868},
	{x: 0.4592, y: -0.8755, z: 0.1505},
	{x: 0.9705, y: 0.0071, z: 0.2409},
	{x: 0.4429, y: -0.8560, z: 0.2666},
	{x: 0.4218, y: -0.8223, z: 0.3820},
	{x: 0.6836, y: -0.0874, z: -0.7246},
	{x: 0.5943, y: -0.7131, z: 0.3719},
	{x: 0.4158, y: 0.6789, z: 0.6051},
	{x: 0.4723, y: -0.6849, z: 0.5548},
	{x: 0.3433, y: -0.6455, z: 0.6823},
	{x: 0.4402, y: -0.6000, z: 0.6679},
	{x: -0.4640, y: -0.8747, z: 0.1404},
	{x: 0.2225, y: -0.5455, z: 0.8080},
	{x: 0.1846, y: -0.3431, z: 0.9210},
	{x: 0.0725, y: -0.3126, z: 0.9471},
	{x: 0.1134, y: -0.1624, z: -0.9802},
	{x: 0.2599, y: -0.3125, z: -0.9137},
	{x: 0.3893, y: -0.4438, z: -0.8072},
	{x: 0.3995, y: -0.5460, z: -0.7364},
	{x: 0.4907, y: -0.5678, z: -0.6610},
	{x: 0.5750, y: -0.5816, z: -0.5754},
	{x: 0.5633, y: -0.6654, z: -0.4898},
	{x: 0.4649, y: -0.7401, z: -0.4860},
	{x: 0.6381, y: -0.6607, z: -0.3954},
	{x: 0.5379, y: -0.7421, z: -0.4001},
	{x: 0.6284, y: -0.7501, z: -0.2060},
	{x: -0.0006, y: 0.0683, z: -0.9977},
	{x: 0.5603, y: -0.8152, z: -0.1468},
	{x: 0.7129, y: -0.6832, z: -0.1581},
	{x: 0.7250, y: -0.6877, z: -0.0371},
	{x: 0.5569, y: -0.8256, z: 0.0907},
	{x: 0.6465, y: -0.7623, z: 0.0301},
	{x: -0.6025, y: -0.6878, z: 0.4049},
	{x: 0.6377, y: -0.7564, z: 0.1456},
	{x: 0.5437, y: -0.8134, z: 0.2069},
	{x: 0.5226, y: -0.7896, z: 0.3217},
	{x: 0.6883, y: -0.6565, z: 0.3087},
	{x: 0.4963, y: -0.7508, z: 0.4358},
	{x: 0.5605, y: -0.6724, z: 0.4834},
	{x: 0.6172, y: -0.5855, z: 0.5256},
	{x: 0.5299, y: -0.5994, z: 0.5999},
	{x: 0.4262, y: -0.5026, z: 0.7521},
	{x: 0.3171, y: -0.4712, z: 0.8230},
	{x: 0.2960, y: -0.3699, z: 0.8806},
	{x: 0.3254, y: 0.3706, z: 0.8700},
	{x: 0.2734, y: -0.2613, z: 0.9257},
	{x: 0.0227, y: -0.2456, z: -0.9691},
	{x: 0.3466, y: -0.2298, z: -0.9094},
	{x: 0.3707, y: -0.3385, z: -0.8648},
	{x: 0.4852, y: -0.4675, z: -0.7389},
	{x: 0.5656, y: -0.3816, z: -0.7310},
	{x: 0.5722, y: -0.4854, z: -0.6611},
	{x: 0.6507, y: -0.4961, z: -0.5748},
	{x: -0.6469, y: -0.5997, z: -0.4710},
	{x: 0.6536, y: -0.5861, z: -0.4788},
	{x: 0.7227, y: -0.5897, z: -0.3604},
	{x: 0.6922, y: -0.6657, z: -0.2786},
	{x: 0.5536, y: 0.7568, z: -0.3475},
	{x: 0.7668, y: -0.6005, z: -0.2270},
	{x: -0.3374, y: -0.6887, z: -0.6418},
	{x: 0.7870, y: -0.6081, z: -0.1043},
	{x: 0.7939, y: -0.6078, z: 0.0170},
	{x: 0.8520, y: -0.5182, z: 0.0741},
	{x: -0.0560, y: -0.1604, z: 0.9855},
	{x: 0.6203, y: -0.7401, z: 0.2597},
	{x: -0.5210, y: -0.4451, z: 0.7283},
	{x: -0.3986, y: -0.8014, z: 0.4459},
	{x: -0.6233, y: -0.7740, z: -0.1118},
	{x: 0.6569, y: -0.6272, z: 0.4184},
	{x: 0.6161, y: -0.5079, z: 0.6020},
	{x: 0.8124, y: -0.0097, z: -0.5830},
	{x: 0.8995, y: -0.3259, z: -0.2910},
	{x: 0.5899, y: -0.4194, z: 0.6900},
	{x: 0.4033, y: -0.3977, z: 0.8241},
	{x: 0.3820, y: -0.2891, z: 0.8778},
	{x: 0.3559, y: -0.1772, z: 0.9176},
	{x: 0.0528, y: -0.1969, z: 0.9790},
	{x: 0.3185, y: -0.1174, z: -0.9406},
	{x: 0.4526, y: -0.2528, z: -0.8551},
	{x: 0.4730, y: -0.3616, z: -0.8034},
	{x: 0.7257, y: -0.4040, z: -0.5570},
	{x: 0.5507, y: -0.2732, z: -0.7887},
	{x: 0.6498, y: -0.3962, z: -0.6487},
	{x: -0.5597, y: 0.1185, z: -0.8202},
	{x: 0.8513, y: -0.2198, z: -0.4765},
	{x: 0.5208, y: -0.5129, z: 0.6824},
	{x: 0.7924, y: -0.4048, z: -0.4563},
	{x: 0.0445, y: 0.6696, z: -0.7414},
	{x: 0.7757, y: -0.4992, z: -0.3861},
	{x: 0.8755, y: -0.4266, z: -0.2268},
	{x: -0.1600, y: -0.7031, z: 0.6929},
	{x: 0.8962, y: -0.4305, z: -0.1073},
	{x: 0.8379, y: -0.5206, z: -0.1639},
	{x: 0.9033, y: -0.4288, z: 0.0128},
	{x: 0.3760, y: -0.7087, z: 0.5969},
	{x: 0.8979, y: -0.4199, z: 0.1319},
	{x: 0.8503, y: -0.3829, z: 0.3610},
	{x: 0.8178, y: -0.4883, z: 0.3046},
	{x: 0.5998, y: 0.0042, z: 0.8001},
	{x: 0.7826, y: -0.4640, z: 0.4151},
	{x: 0.7314, y: -0.4393, z: 0.5217},
	{x: 0.7479, y: -0.3310, z: 0.5753},
	{x: 0.6734, y: -0.4159, z: 0.6112},
	{x: 0.6680, y: -0.3180, z: 0.6728},
	{x: 0.5797, y: -0.3178, z: 0.7503},
	{x: 0.4998, y: -0.4132, z: 0.7612},
	{x: -0.5288, y: 0.5726, z: 0.6265},
	{x: 0.4338, y: -0.0891, z: 0.8966},
	{x: 0.2458, y: -0.1465, z: 0.9582},
	{x: 0.0798, y: -0.0428, z: -0.9959},
	{x: 0.4256, y: -0.1407, z: -0.8939},
	{x: 0.9894, y: -0.1356, z: -0.0516},
	{x: 0.3743, y: 0.9271, z: 0.0177},
	{x: 0.6213, y: -0.1816, z: -0.7622},
	{x: 0.7071, y: -0.1975, z: -0.6790},
	{x: 0.7839, y: -0.2094, z: -0.5845},
	{x: 0.7935, y: -0.3097, z: -0.5239},
	{x: 0.8974, y: -0.1292, z: -0.4220},
	{x: 0.9054, y: -0.2280, z: -0.3581},
	{x: 0.8548, y: -0.3171, z: -0.4108},
	{x: 0.9433, y: -0.2341, z: -0.2352},
	{x: 0.9269, y: -0.3341, z: -0.1711},
	{x: 0.9649, y: -0.2374, z: -0.1122},
	{x: 0.8805, y: -0.4041, z: 0.2479},
	{x: 0.9725, y: -0.2328, z: 0.0104},
	{x: 0.9411, y: -0.3345, z: -0.0494},
	{x: 0.9899, y: -0.1241, z: 0.0687},
	{x: 0.9419, y: -0.3281, z: 0.0716},
	{x: 0.4439, y: 0.0755, z: -0.8929},
	{x: 0.9302, y: -0.3143, z: 0.1898},
	{x: -0.2588, y: -0.9654, z: 0.0323},
	{x: 0.9053, y: -0.2956, z: 0.3051},
	{x: 0.8057, y: -0.3593, z: 0.4710},
	{x: 0.8132, y: -0.2509, z: 0.5251},
	{x: 0.7396, y: -0.2305, z: 0.6324},
	{x: 0.7213, y: -0.1275, z: 0.6807},
	{x: 0.6542, y: -0.2159, z: 0.7249},
	{x: -0.7617, y: 0.0246, z: 0.6475},
	{x: 0.5081, y: 0.0016, z: 0.8613},
	{x: 0.9005, y: 0.3921, z: -0.1881},
	{x: 0.2894, y: -0.0006, z: -0.9572},
	{x: 0.3935, y: -0.0238, z: -0.9190},
	{x: 0.4940, y: -0.0464, z: -0.8682},
	{x: 0.5929, y: -0.0697, z: -0.8023},
	{x: 0.7363, y: 0.0076, z: -0.6766},
	{x: 0.7649, y: -0.1030, z: -0.6358},
	{x: 0.8366, y: -0.1180, z: -0.5349},
	{x: 0.7713, y: 0.4042, z: -0.4916},
	{x: 0.8043, y: 0.3558, z: 0.4760},
	{x: -0.1240, y: -0.9609, z: -0.2477},
	{x: 0.9440, y: -0.1359, z: -0.3007},
	{x: 0.9701, y: -0.0408, z: -0.2393},
	{x: 0.9747, y: -0.1385, z: -0.1756},
	{x: 0.9928, y: -0.0379, z: -0.1140},
	{x: 0.9996, y: -0.0261, z: 0.0061},
	{x: 0.9957, y: 0.0727, z: -0.0575},
	{x: -0.1601, y: -0.9633, z: 0.2154},
	{x: 0.9919, y: -0.0126, z: 0.1261},
	{x: 0.9762, y: -0.1091, z: 0.1874},
	{x: 0.9473, y: -0.2038, z: 0.2472},
	{x: 0.9144, y: -0.1837, z: 0.3607},
	{x: 0.9491, y: -0.0894, z: 0.3019},
	{x: 0.8665, y: -0.2742, z: 0.4171},
	{x: 0.8670, y: -0.1637, z: 0.4707},
	{x: 0.8020, y: -0.1479, z: 0.5787},
	{x: 0.8877, y: 0.3550, z: -0.2931},
	{x: 0.6933, y: -0.0221, z: 0.7203},
	{x: 0.6313, y: -0.1092, z: 0.7678},
	{x: -0.0455, y: -0.9973, z: 0.0585},
	{x: 0.3250, y: -0.0616, z: 0.9437},
	{x: 0.1355, y: -0.1114, z: 0.9845}
]

kd_tree_points_with_index = kd_tree_sample_points.map((point, idx) => {
	point.index = idx;
	return point;
});

module.exports.length = kd_tree_points_with_index.length;
module.exports.tree = new kdTree.kdTree(
	kd_tree_points_with_index,
	utils.euclideanDist,
	['x', 'y', 'z']
);
	