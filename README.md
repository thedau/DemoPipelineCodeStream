# CodeStream CI/CD Demo (GitHub Actions)

Demo nay mo phong bai toan cua doi phat trien CodeStream: thay vi build, test, deploy thu cong, toan bo quy trinh duoc tu dong hoa bang GitHub Actions.

## 1. Muc tieu demo

- Tu dong lint va test khi tao Pull Request.
- Tu dong build artifact sau khi test pass.
- Tu dong deploy mock len staging khi merge vao nhanh `main`.
- Co buoc deploy production theo tag va co them manual deploy tren UI GitHub.

## 2. Cau truc nhanh

- `src/`: ung dung Express mau.
- `tests/`: unit/integration test voi Jest + Supertest.
- `scripts/build.js`: tao build artifact (`dist/build-info.json`).
- `scripts/deploy.js`: mock deploy, tao log (`dist/deploy-log.json`).
- `.github/workflows/ci-cd.yml`: workflow chinh cho GitHub Actions.

## 3. Pipeline dai va chi tiet (GitHub Actions)

Workflow duoc chia thanh nhieu job co quan he `needs`, phu hop de thuyet trinh kien truc CI/CD theo chuan doanh nghiep:

1. `static_checks`: lint code.
2. `unit_tests`: chay test + xuat JUnit + coverage artifact.
3. `dependency_audit`: kiem tra bao mat dependency production (`npm audit`).
4. `integration_api_checks`: khoi dong app va smoke test API bang curl.
5. `build_artifacts`: tao build artifact `dist/build-info.json`.
6. `docker_validation`: build Docker image de xac nhan kha nang dong goi.
7. `deploy_staging`: deploy mock khi merge/push vao `main`.
8. `verify_staging`: verify sau deploy staging.
9. `deploy_production_tag`: deploy mock production khi push tag `v*`.
10. `deploy_manual`: deploy thu cong tu UI Actions.
11. `pipeline_summary`: tong hop ket qua tat ca job vao Step Summary.

## 4. Luong trinh dien de tai

1. Day code len GitHub.
2. Tao nhanh moi, sua nho 1 dong code, push len remote.
3. Tao Pull Request:
   - GitHub Actions tu chay chuoi quality va security (`static_checks`, `unit_tests`, `dependency_audit`, `integration_api_checks`, `build_artifacts`, `docker_validation`).
   - Vao tab Actions de xem tung job.
4. Merge vao `main`:
   - Job `deploy_staging` va `verify_staging` chay tu dong.
   - Kiem tra artifact `dist/deploy-log.json`.
5. Tao 1 tag (vi du `v1.0.0`):
   - Job `deploy_production_tag` chay tu dong.

6. Neu muon demo manual:
   - Vao tab Actions > `CodeStream CI/CD` > `Run workflow`.
   - Chon `deploy_environment` va bam Run.

## 5. Chay local de test truoc khi push

```bash
npm ci
npm run lint
npm run test
npm run build
npm run deploy:mock
```

## 6. Gia tri cho "khach hang" (doi dev CodeStream)

- Giam loi thao tac thu cong.
- Co feedback nhanh tren Merge Request.
- Tieu chuan hoa quy trinh release.
- Tang toc do dua tinh nang moi ra san pham.

## 7. Mo rong de tai (neu muon)

- Them quality gate coverage toi thieu (vi du >= 80%).
- Day Docker image len registry (GHCR, Docker Hub).
- Deploy that len Kubernetes/VM thay cho mock deploy.
- Them thong bao Slack/Teams khi pipeline fail.
