# CLAUDE.md · 协作偏好与项目约定

> 本文件记录用户的协作偏好与项目上下文,供 Claude Code 在每次会话开始时读取,避免重复询问。

---

## 一、用户协作偏好

### 决策与自治
- **默认放手执行,不要反复确认**。包括:创建/切换分支、提交、推送、创建 PR、合并 PR、发布。
- 任务流程默认为:**开发 → 提交 → 推送 → 创建 PR → 合并**,一气呵成,中间无需询问。
- 遇到破坏性操作(强推 main、删除分支、删除文件)仍然先问一句,但其余全部可以直接做。
- 不要在每一步都列 plan 等审核;简短汇报结果即可。

### 沟通风格
- 使用**中文**与我交流,正文简短直接,不要冗长铺垫。
- 代码变更的 commit message、PR 标题/描述也用中文。
- 汇报时只说「做了什么 / 在哪 / 下一步」;不要罗列无关细节。
- 不需要 emoji。

### 代码与文档
- 代码注释尽量少、只写「为什么这样做」的非显而易见信息。
- 不要生成 README / 设计文档 / 方案评估等长文档,除非我明确要求。
- 演示/原型页面使用既有技术栈:**Tailwind(CDN)+ Lucide 图标 + 原生 JS**,不要引入构建工具或框架。

### 分支与 PR
- 每个任务使用独立 feature 分支(名字已由 harness 指定时沿用)。
- PR 标题与 commit 信息首行保持短(< 70 字),细节放在正文。
- 合并策略:默认 **squash merge**;合并后自动删除来源分支。
- PR 合并完成后,**主动切回 main 并 pull 最新代码**,为下一轮任务做好准备。

### 工具链约束
- **只能操作的仓库**: `andi20190206/members2026`。不碰其他仓库。
- 不要用 `gh` CLI,一律使用 `mcp__github__*` 工具。

---

## 二、项目简介 · members2026

### 定位
唯普汽车「商户会员体系」演示站点 —— 静态 HTML 原型,用于评审会员等级、唯金币(积分)、权益卡三大体系的规则与交互。

### 目录结构
```
/
├─ index.html                  # Demo 导航首页
├─ app/                        # 商户端(手机)原型 —— 紫色"滴滴会员"风格
│   ├─ home.html              # APP 首页
│   ├─ member.html            # 会员中心
│   ├─ coins.html             # 金币明细
│   ├─ level.html             # 等级成长
│   ├─ mall.html              # 权益商城
│   ├─ my-rewards.html        # 我的权益卡
│   ├─ profile.html / profile-loggedin.html / login.html / settings.html
│   └─ orders.html / order-detail.html
├─ admin/                      # 运营后台(PC) —— Ant Design 风格
│   ├─ dashboard.html         # 运营仪表盘
│   ├─ level-rule.html        # 等级规则
│   ├─ coin-rule.html         # 金币规则
│   ├─ rewards.html           # 权益卡管理
│   ├─ members.html           # 商户档案
│   ├─ orders.html / order-detail.html           # 内部订单页
│   ├─ bms-orders.html / bms-order-detail.html   # 现网 BMS 订单复刻
│   ├─ bms-users.html / bms-user-detail.html     # 现网 BMS 用户复刻
├─ shared/
│   └─ member-config.js       # 会员等级/金币/权益卡 · 全站统一数据源
└─ docs/                       # PRD / DB Schema / API 文档
```

### 关键约定
- **唯一数据源**: `shared/member-config.js` 导出 `window.MEMBER_CONFIG`,含 4 级会员
  (V0 新人/V1 普通/V2 银卡/V3 金卡)及配色、门槛、权益、金币规则。
  修改任何会员/金币规则都只改这一处。
- **配色**: V0 灰 `#94a3b8` / V1 蓝 `#0ea5e9` / V2 紫 `#8b5cf6` / V3 金 `#f59e0b`。
- **金币**: 1 金币 = 0.093 元,有效期 12 个自然月,按 `获得月 + 12 月` 滚动到期。
- **等级**: 基于滚动近 3 个月成交台数 + 账户金额门槛(详情见 level-rule.html)。
- **BMS 复刻页**: `admin/bms-*.html` 用于 1:1 复刻现网,细节对齐截图,不做再设计。
- **新增页面**: 在 `index.html` 的 Demo 导航里补一张入口卡,保持 ADMIN-xxx / FRONT-xx 编号连续。
- **列表→详情 跳转**: 参照 `bms-orders.html` 模式——整行可点击,行内 `<a>` 保留原生行为,详情参数用 URLSearchParams 透传。

### 部署
- GitHub Pages 托管 main 分支根目录(有 `.nojekyll`)。
- 因此每次合并到 main 后即自动发布,**务必合并后才算"发布完成"**。

---

## 三、快速索引

| 任务 | 入口 |
|---|---|
| 改会员等级 / 权益 / 金币规则 | `shared/member-config.js` |
| 新增运营后台页 | `admin/` + `index.html` 导航卡 |
| 新增商户端页 | `app/` + `index.html` 导航卡 |
| 修改 PRD / 数据库 / API 文档 | `docs/` |
