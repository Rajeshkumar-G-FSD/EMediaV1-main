import { Customer, Service, Product, BlogPost } from './types.ts';

export const CUSTOMERS_DATA: Customer[] = [
  {
    id: 'c1',
    title: 'Lễ gia tiên anh Hùng - Chị Nga',
    date: '24/05/2026',
    description: 'Không gian lễ gia tiên được trang hoàng tinh tế với sắc hồng pastel ngọt ngào làm chủ đạo. Sự kết hợp tinh tế giữa hoa tươi nhập khẩu cùng các chi tiết dải lụa mềm mại mang lại vẻ đẹp vừa hiện đại vừa ấm cúng cho ngày vui.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg2zwfhIMrha_hkpAA4qEX0kfYTHzuqQUqMQT-NSsP9SSpuAuYYDxy-xfbq_I_Y45ZhGQhSnnukvQ9x77LnslrQgwgJ1PaWSiyu_34-k5nCVRr7oQ9AILZur29yi72D6ZSmRkl0gXwJnbhNqXZtH8AKAM019HOtn1sAULFcx0sI3owLiK_UT6f7vO1sjQo95DJ2zsyBFYe4U5g62Dukw6WKNxT6qTfugwh-rj2d6EYhvlWrPMC8fSgV-bhTB9egMPOLqacViGadcQ'
  },
  {
    id: 'c2',
    title: 'Lễ gia tiên Anh Cường - Chị Thư',
    date: '30/04/2026',
    description: 'Thiết kế gia tiên mang đậm phong cách truyền thống cổ điển xen lẫn nét sang trọng quý phái. Phông nền cát tường kết hợp đôi long phụng nghệ thuật được cắm kết tỉ mỉ từ cau trái tươi và hoa thiên điểu rực rỡ.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa_CsFH3wFCbeMMR8mAZbrC-WcUs_sbeqSEzCRg2N2zNEIm1ttzlWQTqb8-yIqFnSc7d_UG6alA5PXZiXE1bLa8ZZfbUfqMUT7_BpFTFBvbJvMvAsI2cyYJsUK-x2D6cBxyeeGTL0iPP3lO17C-QQmU_nSIVI_u7G5l-JY4mmNc8WmfEjxx-fXetUC9aOVsuGc1UXZHIlsgQ9dU6KUaP8TS40MHOxH66nKJuVM_LY5xXcyAzdCTJeB6BLd4x_7ioaKh3KN_r9IaCc'
  },
  {
    id: 'c3',
    title: 'Tiệc cưới anh Phúc - chị Như',
    date: '15/01/2026',
    description: 'Không gian tiệc cưới lộng lẫy ngập tràn ánh đèn ấm áp tại sảnh lớn của khách sạn. Lối đi ngập tràn hoa tươi dẫn lên sân khấu cùng tấm màn backdrop lụa hoa tươi kỳ công đã lưu giữ trọn vẹn từng khoảnh khắc ý nghĩa.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzn6Ey4uGGKCtpZ14C4gGTr91puUwqetS32V3roFGhkxPl8dWd-Il38WZdFwjcXNVdJUsDKjDG63IVKCwg7Oe9fYLS_OzZvNb9E5xfR7WIpJ9bB4tScHfYchlfdjYaV6SDegzAoRTq2ADD9JjKE_rU9d_aRO4rkW4S-ae0_gIO7f0FqK1onVGp-3BLU8y50qFO4BWqfPT_xy2GGuuL0MQESGzPC7_sudttEJ56h_8MUArSKXdbOROY70qW0fCM4X_XQTOFMrE70IU'
  },
  {
    id: 'c4',
    title: 'Tiệc cưới sân vườn anh Tuấn - chị Mai',
    date: '08/11/2026',
    description: 'Một buổi tiệc ngoài trời tràn ngập ánh đèn lung linh tại Đà Nẵng, mang đậm chất lãng mạn châu Âu. Mọi chi tiết từ cổng chào hoa tươi đến bàn tiệc dài đều do Như Ý chuẩn bị tỉ mỉ.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClOg_-jQ0jQh_uqDLeIftgxWdMbzYx-KpsmOIf_frNZ6J-AyeDQBOaPKS1VxP8LDUGA1NR6_BionjNcmn2pwVahvrKwP5ZKgUMkc1qifvnJPUPd244vfLY7WoCEByyi-qgIiYU1O97wWEgqLdptL1S4dkyz-3RaavAD2n2JF31WNeLLIVZHvGNT9prHT7gngoUFL-ndxn0BRoyyweSU7Mjiib0oCGzbuONw4w84rPoUEChUaLpYK4v4YpG7b0-_-4zqkHqxisLaYY'
  },
  {
    id: 'c5',
    title: 'Lễ Đính Hôn anh Sơn - chị Vy',
    date: '12/12/2026',
    description: 'Không gian ấm cúng, sang trọng với tone màu đỏ truyền thống kết hợp hoa sen trắng. Toàn bộ thiết kế toát lên vẻ trang nghiêm và thân mật cho ngày trọng đại gia đình.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1dcE5xsaW65oCcn4XU_3wiJkk3sFvltBYL4CZjrmhgDH3EJhEwgVF0NXcQgv6-RSWuKBZmDDKutqalLM5ET46XXcxMv4xQ7A798QlEvOoey3cBehD_PzgwWMy8v4HhwUg3DvBAfuL8DW6GAQfDGwBL8INAhcFOKGblluPAEaghGdQB6KP84msRUiKiriVrZNtVrOf9KjpQarL7X3tDXNEDQZDzKGTmuda8WOs34I57ANcO0e9Vxoof8YyApj-TJBn0dOyKLkurVM'
  }
];

export const SERVICES_DATA: Service[] = [
  {
    id: 's1',
    title: 'Trang trí lễ gia tiên',
    description: 'Trang trí làm đẹp không gian thờ tự và phòng khách của gia đình. Các gói trang trí đa dạng tông màu phù hợp phong thủy, mang đến không khí thiêng liêng rạng rỡ cho lễ ăn hỏi và rước dâu.',
    detailedDescription: 'Dịch vụ trang trí lễ gia tiên cao cấp của Như Ý mang lại sự tinh tế và ấm cúng cho giây phút gia đình gặp gỡ trao duyên. Chúng tôi cung cấp các gói từ truyền thống đến hiện đại, bao gồm: cổng hoa chào, phông rạp gia tiên, bàn thờ gia tiên kết hoa rồng phượng tỉ mỉ, tráp cưới trang trí nghệ thuật và bàn ghế sang trọng lót nệm cho quan viên hai họ.',
    priceRange: '8.000.000 - 25.000.000 VNĐ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClOg_-jQ0jQh_uqDLeIftgxWdMbzYx-KpsmOIf_frNZ6J-AyeDQBOaPKS1VxP8LDUGA1NR6_BionjNcmn2pwVahvrKwP5ZKgUMkc1qifvnJPUPd244vfLY7WoCEByyi-qgIiYU1O97wWEgqLdptL1S4dkyz-3RaavAD2n2JF31WNeLLIVZHvGNT9prHT7gngoUFL-ndxn0BRoyyweSU7Mjiib0oCGzbuONw4w84rPoUEChUaLpYK4v4YpG7b0-_-4zqkHqxisLaYY'
  },
  {
    id: 's2',
    title: 'Trang trí tiệc cưới',
    description: 'Thiết kế và thi công sảnh tiệc, lối sảnh hoa, bàn gallery và sân khấu chính tại nhà hàng cưới. Biến lễ đường của bạn trở nên thơ mộng, lãng mạn phản ánh câu chuyện tình yêu riêng biệt.',
    detailedDescription: 'Trang trí nhà hàng và không gian tiệc cưới sáng tạo, lộng lẫy theo từng chủ đề riêng của cô dâu chú rể. Dịch vụ trọn gói bao gồm: thiết kế backdrop sân khấu chính nổi bật, lối đi ngập tràn hoa tươi lãng mạn, bàn gallery xinh xắn lưu dấu kỷ niệm và hoa bàn tiệc tinh tế. Như Ý cam kết biến không gian mơ ước thành hiện thực.',
    priceRange: '15.000.000 - 60.000.000 VNĐ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwkVfXAbiKUgKxd90ntJj-gXXKmvopsus-of8AfWr3OU5vsKUJGVdnfufgvJvY_wJAhrCj-WmHblOqbFW9UGKHJ0oNO2d4Zl6VS4pGVSthDjXwhCRO6BOeFSa86D1UVIUEQKZSvNuqh0HR8wsBxr9Hlqr82LmJD4Rr8Frpu4JDeujpMB6LagSIRN7v138FQNzMvdo4c_cnbknE9Qg2V-S40GAC5J3uYGSx5Z5A3yAVs-JascxWriJIMp0KrzqPNT2Dl87Yr_26YwU'
  },
  {
    id: 's3',
    title: 'Tổ chức tiệc ngoài trời',
    description: 'Chuyên tư vấn, lên sơ đồ thi công rạp che, trang trí bãi biển lý tưởng, sân vườn rộng mở. Phối trí hoa tươi, dải đèn led đom đóm, mang lại không gian tiệc tối lung linh hoàn mỹ.',
    detailedDescription: 'Tự hào là đơn vị tiên phong trong trang trí và điều phối các lễ cưới ngoài trời tại bãi biển, sân vườn lãng mạn. Chúng tôi bao trọn gói giải pháp âm thanh, ánh sáng ngoài trời chuyên nghiệp, phông bạt đón mưa nắng tinh xảo, hoa khô phối hoa tươi nghệ thuật đảm bảo độ tươi tắn cả ngày cùng sơ đồ điều phối hợp lý.',
    priceRange: '20.000.000 - 80.000.000 VNĐ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUPhrBoyMK8tGc4FG1e432SJksBPkiLtuVRY_fzuo5wHBZa_skrEP1C1sA7q5lyLUfcWopTY3UKstXyq-g-pjjcXgV7feIfOO8--MmqGruDAQqnYDbVY__oB2mvFlTbHrhP0KN6MEJtEL3fYLIuqV-OVPO0a8IyYWmDIhnQdkp6jr58_KHkQ8ATBH_AbqfZoeC2bRCoGETV6_qTapV90OybLC6Pn97rCrL1YsPS6SqtI0HPpAG91dbPTwCJStpoPYooncfG82viC0'
  },
  {
    id: 's4',
    title: 'Chụp ảnh ngày cưới',
    description: 'Lưu giữ từng khoảnh khắc cảm xúc tự nhiên, quý giá của cô dâu chú rể và hai bên gia đình từ lúc sửa soạn đến hết tiệc...',
    detailedDescription: 'Đội ngũ nhiếp ảnh gia chuyên nghiệp của Như Ý Wedding giàu kinh nghiệm bắt trọn khoảnh khắc vàng thân mật, khóc cười tự nhiên. Chúng tôi cung cấp album cưới chất lượng cao, file gốc chỉnh sửa hoàn thiện nhanh chóng trong vòng 48 giờ sau tiệc.',
    priceRange: '7.000.000 - 18.000.000 VNĐ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg2zwfhIMrha_hkpAA4qEX0kfYTHzuqQUqMQT-NSsP9SSpuAuYYDxy-xfbq_I_Y45ZhGQhSnnukvQ9x77LnslrQgwgJ1PaWSiyu_34-k5nCVRr7oQ9AILZur29yi72D6ZSmRkl0gXwJnbhNqXZtH8AKAM019HOtn1sAULFcx0sI3owLiK_UT6f7vO1sjQo95DJ2zsyBFYe4U5g62Dukw6WKNxT6qTfugwh-rj2d6EYhvlWrPMC8fSgV-bhTB9egMPOLqacViGadcQ'
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'p1',
    name: 'Khung rạp cưới lụa màu xanh mạ non',
    category: 'Khung rạp',
    description: 'Khuôn rạp che dệt từ vải lụa tơ tằm hai tông màu trắng và xanh mạ non dịu mắt mang đến giải pháp che bóng râm mát mẻ, lịch sự cho các buổi tiệc cưới hỏi tổ chức ngoài trời.',
    detailedDescription: 'Hệ thống nhà rạp cao cấp lắp ghép linh hoạt từ Như Ý. Sử dụng chất liệu vải lụa tơ tằm hai tông màu trắng và xanh mạ non tươi mát, mang lại bóng râm dịu mắt và tạo nét trang nhã nổi bật giữa dải không gian rạp ngoài trời. Khung sắt chịu lực an toàn theo tiêu chuẩn thi công.',
    price: '4.500.000 VNĐ / Bộ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr8DsZtIfHlPNQECkbErtKUkLh4s7ekl2cMNwedUjTDQIhrdX_mPJsYdcoE30K9SoU8mCyDk3xpgJ2gev_xFWpNW-8Fd3iWUCABuB9ERcJOYP95ZS30DKlYReXRC7dDWHMiESFsMyt51BTyN8UB86On7Z3g2hQVN6jNNUobGXc6TNodD-uqqxZcaYdpwkIoRqdw1A0Ye7wQMfm2dPFJr_vUCFj9ALW4gS5aWKptd0XlRDR-yW89V7o_LxK6mQiQ7rtgp6vunO_9CI'
  },
  {
    id: 'p2',
    name: 'Cổng hoa cưới voan - đỏ trắng',
    category: 'Cổng hoa',
    description: 'Cổng cưới kết cấu vòm sang trọng, phối giữa lớp vải voan đỏ xếp nếp và các cụm hoa hồng Pháp, mẫu đơn trắng thắm, thích hợp làm điểm nhấn đón khách nổi bật.',
    detailedDescription: 'Cổng hoa cưới nghệ thuật phối kết giữa lụa voan đỏ lãng mạn, tinh tế và các cụm hoa hồng Pháp, mẫu đơn trắng đỏ rực rỡ. Rất phù hợp làm lối đón quan khách trang nghiêm tại tư trang nhà gái hoặc lối đón tiệc sảnh chung cư, nhà hàng.',
    price: '3.200.000 VNĐ / Chiếc',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7dV5GHF4VqntBQG_JYrC9eFDetQcXQELy8kk2JiZRXhYWFfZxW2L7F-cV9pLkKTV9M-qKfOXPTCwpFdZKjBQIl_IpdPqgSqt0g7R-yN5lGwmUbLuGgFqORCGJtfr5wguRc4bZiWwvp5cEguWauhM_6OlB1mx_RrDvcgWd--q5TzGQbGCmwntUTZj4QX1oTRZ-N4eeFAQ9MNC7LUfNy_0Gq2EZmPbuk1SHPkr-KP-2zZndLGlCyJ_NSaGLkzwIF1JmgV8X-AW5oXM'
  },
  {
    id: 'p3',
    name: 'Long phụng đấu đuôi nghệ thuật',
    category: 'Mâm quả',
    description: 'Cặp rồng phượng cổ điển đứng đôi uốn lượn được tạo tác hoàn chỉnh bằng tay từ lá dứa thơm, ớt hiểm, cau tươi và vạn thọ vàng, biểu trưng cho sự hòa hợp phu thê tròn vẹn.',
    detailedDescription: 'Sản phẩm thủ công truyền thống kết hình Rồng Phượng tinh xảo chạm từ lá dứa thơm, ớt đỏ, cau tròn và hoa cúc vạn thọ tươi. Biểu trưng ý nghĩa trăm năm bền chặt tốt lành hòa hợp phu thê, rất tôn vinh nét đẹp gia lễ trong đám cưới Việt Nam.',
    price: '6.000.000 VNĐ / Bộ hai linh vật',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUiZ3xB3iZ0kawkjVtRMFPYu_jqPlIRZ85Wo-LQUD9zDzff-1wThuZ58IMtG8tVmMG2-1Xa3PuHFz1QQq6A7tc20uIvlL2hDJKqKLQK1PXaqLiGq3F_f-7EzesH3ocCL_IbknUz8xrv4Iq6tYRG8nuCfREU3yD760ZbwipYnHjfPtTUCaG_wlEnE0UjcrHw3Nn5O4tLX32d8CIhTkG6VlDGnq-B9II3S7XTHDfaVyuVZnK3SYJdnPQnGt3S-Ak48faH6TXdxKtBoQ'
  },
  {
    id: 'p4',
    name: 'Tráp rồng phượng dâng cưới',
    category: 'Mâm quả',
    description: 'Set tráp quả ăn hỏi kết Rồng Phượng rực rỡ được đính kim sa sang trọng, tỉ mẩn tôn vinh lễ vật dâng tổ tiên...',
    detailedDescription: 'Set tráp quả cao cấp của Như Ý, được hoàn thiện hoàn toàn thủ công. Mỗi bộ linh vật rồng cuốn và phượng múa được kết từ cau trái đồng đều, ớt chỉ thiên chín đỏ, lá dừa non cắt tỉa nghệ thuật và hoa quả nhập khẩu tươi ngon.',
    price: '4.800.000 VNĐ / Bộ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwkVfXAbiKUgKxd90ntJj-gXXKmvopsus-of8AfWr3OU5vsKUJGVdnfufgvJvY_wJAhrCj-WmHblOqbFW9UGKHJ0oNO2d4Zl6VS4pGVSthDjXwhCRO6BOeFSa86D1UVIUEQKZSvNuqh0HR8wsBxr9Hlqr82LmJD4Rr8Frpu4JDeujpMB6LagSIRN7v138FQNzMvdo4c_cnbknE9Qg2V-S40GAC5J3uYGSx5Z5A3yAVs-JascxWriJIMp0KrzqPNT2Dl87Yr_26YwU'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Chụp ảnh cưới đẹp hoàn hảo với chi phí tiết kiệm nhất',
    summary: 'Cẩm nang hướng dẫn các đôi bạn trẻ lên dự phòng chi phí, đàm phán hợp đồng, chọn lựa gói chụp hình rực rỡ mà gọn nhẹ, tránh lãng phí những dịch vụ không cần thiết.',
    content: `Để có được album cưới đẹp lung linh nhưng vẫn nằm trong ngân sách cho phép luôn là bài toán đau đầu của các cặp đôi trẻ. Dịch vụ cưới Như Ý khuyên bạn nên lưu ý 3 điểm mấu chốt sau:
    
    1. LỰA CHỌN GÓI CHỤP PHÙ HỢP: Đừng ham những gói chụp kèm theo quá nhiều quà tặng không thực tế. Thay vào đó, tập trung vào chất lượng file ảnh chỉnh sửa và kích thước album phóng to bạn thực sự muốn treo ở phòng tân hôn.
    
    2. CHUẨN BỊ TRƯỚC VỀ TRANG PHỤC VÀ KHÁI NIỆM (CONCEPT): Hãy thảo luận kỹ lưỡng với Stylist của ê-kíp chụp hình về câu chuyện tình yêu của hai bạn để lựa chọn concept phù hợp nhất. Trang phục tự chuẩn bị đôi khi mang lại sự tự nhiên và cá tính hơn nhiều so với váy cưới đi thuê quá nặng nề.
    
    3. THỜI ĐIỂM CHỤP HÌNH: Đặt lịch trước tối thiểu 2-3 tháng để nhận các chương trình ưu đãi tri ân sớm và tránh các mùa cao điểm chụp hình cưới dồn dập khiến ê-kíp photographer quá tải, ảnh hưởng chất lượng sản phẩm.`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1dcE5xsaW65oCcn4XU_3wiJkk3sFvltBYL4CZjrmhgDH3EJhEwgVF0NXcQgv6-RSWuKBZmDDKutqalLM5ET46XXcxMv4xQ7A798QlEvOoey3cBehD_PzgwWMy8v4HhwUg3DvBAfuL8DW6GAQfDGwBL8INAhcFOKGblluPAEaghGdQB6KP84msRUiKiriVrZNtVrOf9KjpQarL7X3tDXNEDQZDzKGTmuda8WOs34I57ANcO0e9Vxoof8YyApj-TJBn0dOyKLkurVM'
  },
  {
    id: 'b2',
    title: 'Kinh nghiệm để đơn giản hóa và tiết kiệm chi phí đám cưới',
    summary: 'Chia sẻ bí quyết tinh gọn hóa danh sách công việc chuẩn bị, tập trung ngân sách cho những mục cốt lõi để ngày trọng đại thật thư thái và ấm cúng.',
    content: 'Đơn giản hóa đám cưới không có nghĩa là làm sơ sài, mà là cắt giảm những thủ tục rườm rà không cần thiết và dồn ngân sách vào những yếu tố cốt lõi như ẩm thực, trang trí gia tiên và khâu tổ chức đón tiếp khách thật chu đáo. Hãy sử dụng hệ thống điều phối tinh giản từ Như Ý để gánh vác nỗi lo chuẩn bị, giúp gia đình thoải mái tận hưởng ngày vui.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqu-whlyRh6r8gDwAJLaie67CmE5ew7eubKcYS9i5Ab-TyJ_-mMzn8tWZynbSVBw01ugXaSXT5uAkpoGHztYo8WTw8Y3ggkNxgUGqetgf4ua2y5Ze823m83_R6-lZ6bPq3OQ5q-bdkEGMPRmnZeXCHYvGLUhBqcuwbHwA5Itp0EfAeqchBSCh9b08J-dM6yHVT97VK6GOfH3zXWFm5NZTu5WSrkQM4OFbJ6E4HNumGWU_2TjkhrQZ-40mSzopc5t6qlH2kMCiboQ4'
  },
  {
    id: 'b3',
    title: 'Chuẩn bị cho đám cưới ở quê khác ở thành phố ra sao?',
    summary: 'Xem xét tỉ mỉ sự khác biệt về quy mô khách mời, vị trí dựng rạp che, bày trận mâm cỗ truyền thống ở quê hương so với sảnh tiệc lạnh tại đô thị.',
    content: 'Tổ chức đám cưới ở quê thường mang tính tập thể dòng họ cao với lượng khách đông đảo, đòi hỏi chuẩn bị không gian bạt rạp rộng mở và các món ăn mang đậm hương vị truyền thống xứ sở. Trái lại, đám cưới thành phố hướng đến sự tinh gọn, sang trọng tại các trung tâm hội nghị tiệc cưới chuyên nghiệp. Như Ý thiết kế riêng các gói trang trí linh hoạt để hòa hợp trọn vẹn cả hai phong cách văn hóa này.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoPSdCl0HI3YEUx6MSjWAvNgoeFgxrGPC80bHcB_k3qfuD_HPMXRTf7u2fmjBRGf7TZpbpbJBpdHvhJRRafaMOrMcTWuv8h3j2nhf_0Yco6RN2-arfM7ajZKAEa5Fr5DFE6WLBWyS0s6oCjjYmamJ2yo-1Ao87s2XJU2ccI5zRiWD9oDeAT2mTeTkaiNbFzDO02KtPJVmA9K5hsB1hoWZErOW0MWmL25sDwtwSdEN0dE6tpcQUOe8478rzVDLZVsUxd_GMbxBH2DM'
  },
  {
    id: 'b4',
    title: '3 kinh nghiệm chọn lọc danh sách khách mời đám cưới',
    summary: 'Phương pháp phân loại nhóm khách mời, tối ưu số lượng bàn tiệc thực tế và dự trù xác suất vắng mặt để sắp xếp đón tiếp lịch lãm và chu đáo nhất.',
    content: 'Khách mời chính là những nhân chứng trực tiếp sưởi ấm cho hôn lễ của bạn. Quy tắc vàng để chọn lọc danh sách khách mời: \n1. Ưu tiên người nhà và bạn bè thân thiết liên lạc thường xuyên trong vòng 1 năm.\n2. Phân chia rõ ràng số lượng ghế cho bố mẹ hai bên và của riêng hai bạn.\n3. Luôn dự trù khoảng 10% khách mời vắng mặt để xếp bàn phù hợp.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdqLtEt0PLur_7mvC4JzHv1BpbECQsbLgsSm5lYc7F_rcIS6QSyc4ms3NtX2cBMyM0DNVidGlazdL0so1Bk0KL88le0b-_OXB5pp-5NjCw0q4G_xLHRxgwT3iZ4UNr6aUExM7tKZRuH37EPqjp-0Nq3CWsjY8roSU_kQe_NduwcZYPzgBMr45kr1pj2UdahSb58aatE406HTRjqc93CFJVPB23b9VsdQJQWh8ge-IjPYflENuoYdt2ZyyYf05xx7jkxXQVedKdsJk'
  },
  {
    id: 'b5',
    title: 'Kinh nghiệm quý báu khi đặt nhà hàng tiệc cưới',
    summary: 'Những lưu ý cốt lõi khi đi xem sảnh cưới, rà soát chi phí phát sinh ẩn như khai vị, bia bọt, quy trình vận chuyển sảnh hoa ngoài và ưu đãi tặng kèm.',
    content: 'Khi tiến hành khảo sát và chọn sảnh cưới nhà hàng, các cặp đôi cần tỉnh táo rà soát kỹ các điều khoản hợp đồng liên quan đến: Phí phục vụ, chi phí đồ uống đi kèm có được miễn phí không, phí mang các đơn vị trang trí bên ngoài vào (như Như Ý) và các dịch vụ tặng kèm như khói, tháp ly hay MC.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoWWXkssJqLcgqxjwUJBRd2jdbhX45Y5VjGPj8co2gojzWNz1ErlKpjYoHFTl7HJDfYWpZm4hskkMVnnJTCuzhmZqxza68Z5ugGFuGPN3j0mRM-m-vyg_k66X-fEKBRd16iv6Py0FxIi4JVj-rmytmddQuzmVpeZL1oq8jbMK2hrurduJg3ysnmSM0Mm9k0jSTKXaQbAW7VrrdOshghX03FFbNRWwVVKDTigOQq-oM4Uw-C2Ffy20-KsHtC_2nXNKigacEx0u3vQc'
  }
];
