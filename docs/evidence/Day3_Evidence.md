# Day3 证据卡——Mock 数据建模与列表渲染

## 一、数据设计思路

### 我的设计

在开始 Day3 任务之前，我首先分析了"校园轻集市"的四个核心业务场景：

1. **二手交易**：需要展示商品的基本信息，包括标题、价格、分类、成色、发布人、发布时间、地点、图片等。状态字段用于区分商品是否已售出。

2. **失物招领**：需要区分"我丢了"和"我捡到"两种类型，包含物品名称、地点、时间、联系人、描述等字段。状态字段用于标记是否已找回。

3. **拼单搭子**：需要展示拼单目标人数、当前人数、截止时间、发起者等信息。进度条可以直观展示拼单完成情况。

4. **跑腿委托**：需要展示任务标题、酬劳、取件地点、送达地点、截止时间、发布人等信息。状态字段用于标记任务是否待接单、进行中或已完成。

我设计的数据结构遵循以下原则：
- 字段命名统一使用驼峰命名法
- 每个业务对象都包含 id、title、status 等基础字段
- 图片字段使用网络图片地址，便于页面展示
- 状态字段使用统一的枚举值，便于后续筛选和展示

### AI 设计

AI 生成的数据结构相对复杂，包含了一些我最初没有考虑到的字段：

**优点：**
- AI 为每个业务对象添加了更多的详细字段，如二手交易的 originalPrice（原价）、views（浏览量）、likes（点赞数）等，这些字段丰富了页面展示内容
- AI 设计了更完整的状态流转，如跑腿委托的 takerId（接单人ID）字段，便于后续实现任务接单功能
- AI 为每个数据对象添加了具体的校园场景内容，使数据更加贴近真实应用

**问题：**
- AI 生成的字段有些过于复杂，如 sellerId、publisherId 等关联字段，在 Day3 阶段暂时不需要
- AI 设计了一些冗余字段，如 groupBuys 中的 type 字段，在拼单场景中实际用途不大

### 最终调整

我对 AI 生成的数据结构进行了以下调整：

1. **保留的内容**：
   - 二手交易的 originalPrice、views、likes 字段，用于页面展示价格对比和热度信息
   - 失物招领的 phone 字段，便于联系失主或捡拾者
   - 拼单搭子的 organizerName、campus 字段，用于展示发起者信息和拼单范围
   - 跑腿委托的 takerId 字段，为后续任务接单功能预留接口

2. **修改的内容**：
   - 简化了部分字段命名，如将 eventTime 改为 time，targetCount 改为 minPeople，currentCount 改为 currentPeople
   - 移除了一些冗余字段，如 groupBuys 中的 type 字段
   - 统一了状态字段的命名，如 trades 使用 'open' | 'closed'，errands 使用 'pending' | 'inProgress' | 'completed'

3. **删除的内容**：
   - 移除了一些过于复杂的关联字段，如 sellerId、publisherId 等，在 Day3 阶段暂时不需要
   - 删除了一些测试数据，确保数据内容贴近校园场景

## 二、JSON Server 接口模拟

### 配置过程

1. **安装依赖**：使用 npm 安装 json-server 和 axios 作为开发依赖

2. **创建 db.json**：在项目根目录创建 db.json 文件，包含 trades、lostFounds、groupBuys、errands 四个数据集合

3. **配置启动命令**：在 package.json 的 scripts 中添加 mock 命令：
   ```json
   "mock": "json-server --watch db.json --port 3001"
   ```

4. **启动服务**：运行 npm run mock 启动 JSON Server，访问 http://localhost:3001 可以查看所有接口

### 接口测试

通过浏览器访问以下接口，确认数据可以正常返回：
- http://localhost:3001/trades - 二手交易列表
- http://localhost:3001/lostFounds - 失物招领列表
- http://localhost:3001/groupBuys - 拼单搭子列表
- http://localhost:3001/errands - 跑腿委托列表

## 三、Axios 请求封装

### 基础封装

在 src/api/http.ts 中创建了 Axios 实例：

```typescript
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
})

export default http
```

### 业务 API 模块

分别创建了四个业务 API 文件：
- trade.ts - 二手交易接口
- lostFound.ts - 失物招领接口
- groupBuy.ts - 拼单搭子接口
- errand.ts - 跑腿委托接口

每个文件都包含了基础的 CRUD 操作，以 trade.ts 为例：

```typescript
export const getTrades = () => {
  return http.get<Trade[]>('/trades')
}

export const getTradeById = (id: number) => {
  return http.get<Trade>(`/trades/${id}`)
}

export const createTrade = (data: Omit<Trade, 'id'>) => {
  return http.post<Trade>('/trades', data)
}

export const updateTrade = (id: number, data: Partial<Trade>) => {
  return http.put<Trade>(`/trades/${id}`, data)
}

export const deleteTrade = (id: number) => {
  return http.delete(`/trades/${id}`)
}
```

## 四、页面列表渲染

### 二手交易页面

在 TradeView.vue 中，使用 onMounted 钩子请求数据，并通过 computed 属性实现搜索和筛选功能：

```typescript
const fetchTrades = async () => {
  loading.value = true
  try {
    const response = await getTrades()
    trades.value = response.data
  } catch (error) {
    console.error('获取商品列表失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTrades()
})
```

模板中使用 ProductCard 组件渲染商品列表，支持按分类筛选和按价格、时间排序。

### 失物招领页面

在 LostFoundView.vue 中，使用 tabs 切换"我丢了"和"我捡到"两种类型，通过 computed 属性过滤数据：

```typescript
const filteredItems = computed(() => {
  return items.value.filter(item => item.type === activeTab.value)
})
```

### 拼单搭子页面

在 GroupBuyView.vue 中，展示拼单进度条和剩余人数，支持点击"立即参团"按钮加入拼单。

### 跑腿委托页面

在 ErrandView.vue 中，展示任务的起点和终点、悬赏金额，支持点击"立即接单"按钮接受任务。

## 五、通用组件

### ItemCard.vue

创建了通用列表卡片组件，可以被多个页面复用。组件支持图片、标题、价格、标签等基本信息展示。

### EmptyState.vue

创建了空状态组件，当页面没有数据时显示友好提示。组件支持自定义图标和提示文字。

## 六、AI 协作总结

### 我的设计 vs AI 设计

| 维度 | 我的设计 | AI 设计 | 最终选择 |
| --- | --- | --- | --- |
| 字段数量 | 较少，只包含必要字段 | 较多，包含丰富字段 | 保留 AI 的丰富字段 |
| 字段命名 | 使用简单命名 | 使用更规范的命名 | 采用 AI 的规范命名 |
| 状态设计 | 简单状态 | 完整状态流转 | 采用 AI 的完整状态 |
| 数据内容 | 较为抽象 | 贴近校园场景 | 采用 AI 的真实数据 |
| 复杂度 | 低 | 较高 | 适度简化 |

### 人工审查要点

1. **数据贴合业务**：确认所有数据都围绕校园二手、失物、拼单、跑腿四个核心场景
2. **字段含义清晰**：每个字段都有明确的业务含义，便于页面展示和后续开发
3. **数据可展示**：页面列表需要的标题、描述、时间、地点等字段完整
4. **接口可访问**：JSON Server 能正常返回数据，API 路径配置正确
5. **请求分层清晰**：API 请求从页面组件中分离，便于维护和测试
6. **代码简洁**：避免过度封装和复杂鉴权逻辑，符合 Day3 阶段要求

## 七、总结

Day3 是从"静态页面骨架"走向"数据驱动页面"的关键一步。通过本次实训，我理解了：

1. **Mock 数据的作用**：Mock 数据不仅是测试数据，更是理解业务、验证页面、模拟后端接口的重要工具
2. **数据结构设计的重要性**：合理的数据结构设计能够为后续开发奠定良好基础，避免出现接口路径不清、页面字段对不上等问题
3. **接口请求分层的必要性**：将 API 请求从页面组件中分离，能够提高代码的可维护性和可测试性
4. **AI 协作的价值**：AI 能够快速生成基础代码和数据结构，但需要人工进行审查和调整，确保符合项目需求

在后续的开发中，我将基于 Day3 设计的数据结构，继续完成 Day4 的发布表单、Day5 的状态管理等任务。
