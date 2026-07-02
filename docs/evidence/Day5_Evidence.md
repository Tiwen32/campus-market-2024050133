# Day5 Evidence - 状态管理与用户中心

## 1. 今日完成内容

今日完成了校园轻集市的**Pinia状态管理**体系搭建和**用户中心**页面完善，具体工作如下：

1. 创建了 `src/stores/favorite.ts`，独立管理用户收藏状态，支持添加收藏、取消收藏、判断是否已收藏等操作；
2. 修改了 `src/components/AppHeader.vue`，在导航栏中显示当前用户信息（用户名和头像），点击可跳转到个人中心；
3. 修改了 `src/views/PublishView.vue`，从 userStore 中读取当前用户信息作为发布人，替代之前的固定值；
4. 修改了 `src/components/ProductCard.vue`，使用 favoriteStore 管理收藏状态，实现列表页收藏功能；
5. 完善了 `src/views/UserCenterView.vue`，展示用户资料、我的发布（二手交易、失物招领、拼单搭子、跑腿委托）和我的收藏。

## 2. 发布类型与字段设计

| 发布类型 | 对应数据集合 | 关键字段 | 设计理由 |
|---|---|---|---|
| 二手交易 | trades | title、category、price、condition、location、description | 需要展示商品基本信息和交易条件，帮助买家了解商品情况并做出购买决策 |
| 失物招领 | lostFounds | title、type、itemName、location、eventTime、description | 需要区分寻物和招领，并描述物品信息 |
| 拼单搭子 | groupBuys | title、type、targetCount、deadline、location、description | 需要说明人数目标和截止时间 |
| 跑腿委托 | errands | title、taskType、reward、from、to、deadline、description | 需要说明任务内容、地点和酬劳 |

## 3. 表单校验规则

请说明哪些字段设置了校验规则。
例如：
- 标题不能为空；
- 地点不能为空；
- 描述不能为空；
- 二手交易价格必须大于 0；
- 拼单目标人数不能少于 2；
- 跑腿酬劳不能为负数。

## 4. Store 设计说明

### user.ts Store
**主要作用**：管理当前用户信息，包括用户的基本资料和登录状态。

**状态设计**：
- `currentUser`：当前登录用户对象，包含 id、name、avatar、phone、campus、role 字段；
- `isLoggedIn`：用户登录状态标识。

**Actions 设计**：
- `login(user)`：模拟用户登录，更新用户信息；
- `logout()`：模拟用户登出；
- `updateProfile(profile)`：更新用户资料。

### favorite.ts Store
**主要作用**：管理用户收藏状态，支持四类业务的收藏操作。

**状态设计**：
- `favorites`：收藏记录数组，每个记录包含 id、type 和 item 字段；

**Actions 设计**：
- `addFavorite(item, type)`：添加收藏；
- `removeFavorite(itemId, type)`：取消收藏；
- `toggleFavorite(item, type)`：切换收藏状态；
- `isFavorite(itemId, type)`：判断是否已收藏；

**Getters 设计**：
- `favoriteCount`：收藏总数；
- `tradeFavorites`：二手交易收藏列表；
- `lostFoundFavorites`：失物招领收藏列表；
- `groupBuyFavorites`：拼单搭子收藏列表；
- `errandFavorites`：跑腿委托收藏列表。

## 5. 状态边界

### 放入 Store 的数据
- **当前用户信息**：多个页面（导航栏、发布页、个人中心）都需要使用，适合放入 Store；
- **收藏列表**：列表页和个人中心都需要使用，适合放入 Store；

### 不放入 Store 的数据
- **表单输入内容**：只属于当前页面组件，不需要跨页面共享；
- **表单校验错误信息**：只属于当前表单页面；
- **接口返回的列表数据**：暂时只在单个页面使用，留在页面组件中即可；
- **页面临时状态**（如搜索关键词、筛选条件）：只影响当前页面，不需要全局共享；

## 6. AI 协作记录

- **使用的 AI 工具**：Trae AI Coding 助手；
- **核心提示词**："根据 Day5 实验手册要求，创建 Pinia 的 user 和 favorite Store，修改导航栏显示用户信息，修改发布页面使用用户状态，完善个人中心页面展示我的发布和我的收藏"；
- **AI 生成内容**：
  1. `favorite.ts` Store 的基础框架，包含 addFavorite、removeFavorite、toggleFavorite、isFavorite 方法；
  2. AppHeader.vue 中用户信息显示的代码；
  3. PublishView.vue 中使用 userStore 的代码；
- **AI 生成内容的不合理之处**：
  1. AI 生成的 favorite Store 类型定义不够完善，需要手动补充四类业务类型；
  2. AI 生成的收藏逻辑没有结合后端 API，只做了前端状态管理；
  3. AI 生成的个人中心我的发布部分只处理了二手交易，没有处理其他三类业务；
  4. AI 生成的代码中存在一些类型不匹配问题，需要手动修正。

## 7. 人工调整内容

针对 AI 生成的内容，进行了以下人工调整：

- **完善类型定义**：为 favorite.ts 添加了 Trade、LostFound、GroupBuy、Errand 四种类型的联合类型定义；
- **结合后端 API**：在 ProductCard.vue 的收藏操作中，同时调用后端 API 和更新 Pinia 状态，确保数据持久化；
- **扩展我的发布**：在 UserCenterView.vue 中添加了失物招领、拼单搭子、跑腿委托三类业务的发布列表展示；
- **修正类型问题**：修复了 AI 生成代码中的类型不匹配问题，确保代码能够正常构建；
- **优化用户体验**：在导航栏用户信息区域添加了点击跳转个人中心的功能；
- **完善收藏显示**：在个人中心收藏页面中，显示收藏的商品信息和取消收藏按钮。

## 8. 测试记录

**测试场景：收藏商品并在个人中心查看**

1. 打开 `/trade` 二手交易页面；
2. 选择一个商品卡片，点击爱心按钮收藏；
3. 观察到爱心变成红色，点赞数增加；
4. 点击导航栏的用户信息区域，跳转到 `/user` 个人中心页面；
5. 点击"我的收藏"标签；
6. 在收藏列表中看到刚刚收藏的商品；
7. 点击商品卡片，可以查看商品详情；
8. 点击收藏列表中的爱心按钮，可以取消收藏；
9. 测试发布功能：点击"发布信息"，填写表单并发布；
10. 在个人中心"我的发布"标签中看到刚刚发布的商品。

## 9. 遇到的问题与解决方法

**问题：Store 中状态修改后页面没有变化**

- **现象**：在 favorite.ts 中修改 favorites 数组后，页面没有重新渲染；
- **原因**：直接修改数组元素时，Pinia 的响应式系统没有检测到变化；
- **解决方法**：使用 splice 方法修改数组，或者确保在组件中使用 computed 属性读取 Store 状态，这样能够正确追踪响应式变化。

**问题：类型不匹配**

- **现象**：favorite Store 中的 item 类型需要同时支持四种业务类型，但 TypeScript 报错；
- **原因**：四种业务类型的字段不完全一致；
- **解决方法**：使用联合类型定义，并在需要特定字段时进行类型断言或类型守卫。

## 10. 今日反思

**Pinia**、**状态管理**和**用户中心**是现代前端应用中不可或缺的核心概念。状态管理解决了多页面应用中数据共享的问题，使得用户信息、收藏列表等跨页面使用的数据能够被统一维护。用户中心则是这些共享状态的集中展示平台，让用户能够查看和管理自己的个人信息、发布记录和收藏内容。

通过今日的实践，我理解了状态管理的边界——不是所有数据都需要放入 Store，只有真正需要跨页面共享的数据才应该集中管理。这不仅能够提高代码的可维护性，还能避免不必要的性能开销。Pinia 的使用使得状态管理变得清晰而简单，通过合理的 Store 划分和明确的状态边界，前端应用能够更好地组织和维护，为后续的功能扩展打下坚实基础。