# CodeStream CI/CD Demo (GitHub Actions)

Tài liệu này mô phỏng đúng bài toán trong báo cáo: đội CodeStream đang build, kiểm thử và triển khai thủ công; mục tiêu là chuẩn hóa thành quy trình CI/CD tự động, có kiểm soát chất lượng, bảo mật, staging, production và rollback.

## 1. Mục tiêu của demo

- Tự động hóa luồng từ commit đến triển khai.
- Giảm lỗi thao tác thủ công khi build/test/deploy.
- Bổ sung bước đệm Staging trước khi lên Production.
- Có kiểm thử bảo mật và cơ chế rollback khi triển khai lỗi.

## 2. Cấu trúc dự án

- `src/`: Ứng dụng Express mẫu.
- `tests/`: Unit test và API test bằng Jest + Supertest.
- `scripts/build.js`: Tạo artifact `dist/build-info.json`.
- `scripts/deploy.js`: Deploy mô phỏng và ghi log `dist/deploy-log.json`.
- `scripts/rollback.js`: Rollback mô phỏng và ghi log `dist/rollback-log.json`.
- `.github/workflows/ci-cd.yml`: Pipeline GitHub Actions.

## 3. Pipeline chi tiết theo báo cáo

Pipeline được thiết kế theo 3 giai đoạn giống nội dung báo cáo dự án.

### Giai đoạn 1: Tự động hóa Build và kiểm thử

1. `stage1_ci_build_test`
- Lint code.
- Chạy unit test + coverage.
- Build artifact.
- Lưu JUnit report, coverage report và build artifact.

2. `stage1_security_checks`
- Chạy `npm audit` cho dependency production.
- Quét secret bằng Gitleaks.

3. `stage1_integration_test`
- Khởi động app tạm thời.
- Smoke test các API chính (`/health`, `/api/v1/message`).

### Giai đoạn 2: Triển khai Staging và xác nhận

4. `stage2_deploy_staging`
- Chạy khi push vào `main`.
- Deploy mock lên Staging.
- Ghi artifact deploy log.
- Tạo thông báo UAT (mô phỏng).

5. `stage2_verify_staging`
- Bước xác nhận sau triển khai Staging.

### Giai đoạn 3: Triển khai Production và rollback

6. `stage3_deploy_production`
- Chạy khi push tag bắt đầu bằng `v` (ví dụ `v1.0.0`).
- Deploy mock lên Production.

7. `stage3_rollback_if_failed`
- Chỉ chạy khi deploy production thất bại.
- Thực thi rollback mock và lưu rollback log.

### Bổ sung cho vận hành

8. `manual_deploy`
- Cho phép chạy thủ công từ tab Actions.

9. `pipeline_summary`
- Tổng hợp trạng thái tất cả job vào Step Summary.

## 4. Cách chạy demo khi báo cáo

1. Tạo Pull Request vào `main` để trình bày giai đoạn 1.
2. Merge PR để kích hoạt giai đoạn 2 (deploy staging).
3. Tạo tag `v1.0.0` để kích hoạt giai đoạn 3 (deploy production).
4. Nếu cần demo sự cố, mô phỏng lỗi deploy để trình bày rollback.
5. Mở tab Actions để giải thích đồ thị phụ thuộc giữa các job (`needs`).

## 5. Chạy kiểm tra tại máy local

```bash
npm ci
npm run lint
npm run test:coverage
npm run build
npm run deploy:mock
npm run deploy:rollback
```

## 6. Giá trị mang lại cho đội CodeStream

- Chuẩn hóa quy trình từ commit đến production.
- Có phản hồi nhanh cho lập trình viên qua pipeline tự động.
- Giảm rủi ro release nhờ Staging và rollback.
- Dễ mở rộng thêm quality gate, thông báo Slack/Teams và triển khai thực tế.
