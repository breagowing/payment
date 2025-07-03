"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Upload, PlusCircle, Lightbulb, Flower2, Wrench, Palette, Crown, Receipt, DollarSign, Truck, AlertTriangle } from "lucide-react"
import type { ReactNode } from "react"

// --- MOCK DATA ---
const reconciliationData = {
  lighting: {
    category: "灯光舞美",
    icon: <Lightbulb className="h-5 w-5 text-yellow-500" />,
    budget: 15000,
    quote: 15200,
    actual: 15800,
    plan: {
      vendor: "阿杰灯光",
      items: [
        { id: 1, name: "P6 LED大屏", spec: "4m x 3m", qty: 1, unitPrice: 8000 },
        { id: 2, name: "光束灯", spec: "230W", qty: 10, unitPrice: 300 },
        { id: 3, name: "面光灯", spec: "LED", qty: 8, unitPrice: 250 },
        { id: 4, name: "追光灯", spec: "2500W", qty: 2, unitPrice: 1000 },
      ],
    },
    quotation: {
      vendor: "阿杰灯光",
      items: [
        { id: 1, name: "P6 LED大屏", spec: "4m x 3m", qty: 1, unitPrice: 8000 },
        { id: 2, name: "光束灯", spec: "230W", qty: 10, unitPrice: 320 },
        { id: 3, name: "面光灯", spec: "LED", qty: 8, unitPrice: 250 },
        { id: 4, name: "追光灯", spec: "2500W", qty: 2, unitPrice: 1000 },
      ],
    },
    execution: {
      vendor: "阿杰灯光",
      items: [
        { id: 1, name: "P6 LED大屏", spec: "4m x 3m", qty: 1, unitPrice: 8000 },
        { id: 2, name: "光束灯", spec: "230W", qty: 12, unitPrice: 300 },
        { id: 3, name: "面光灯", spec: "LED", qty: 8, unitPrice: 275 },
        { id: 4, name: "追光灯", spec: "2500W", qty: 2, unitPrice: 1000 },
      ],
    },
  },
  designMaterial: {
    category: "设计物料",
    icon: <Palette className="h-5 w-5 text-purple-500" />,
    budget: 8000,
    quote: 8200,
    actual: null,
    plan: {
      vendor: "创意设计工作室",
      items: [
        { id: 1, name: "背景设计", price: 3000 },
        { id: 2, name: "邀请函设计", price: 2000 },
        { id: 3, name: "物料印刷", price: 2500 },
        { id: 4, name: "其他设计费", price: 500 },
      ],
    },
    quotation: {
      vendor: "创意设计工作室",
      items: [
        { id: 1, name: "背景设计", price: 3000 },
        { id: 2, name: "邀请函设计", price: 2200 },
        { id: 3, name: "物料印刷", price: 2500 },
        { id: 4, name: "其他设计费", price: 500 },
      ],
    },
    execution: null,
  },
  floral: {
    category: "婚礼花艺",
    icon: <Flower2 className="h-5 w-5 text-pink-500" />,
    budget: 25000,
    quote: 24800,
    actual: null,
    plan: {
      vendor: "大姐花艺",
      items: [
        { id: 1, name: "主舞台花艺", price: 12000 },
        { id: 2, name: "T台路引", price: 8000 },
        { id: 3, name: "手捧花", price: 1500 },
        { id: 4, name: "胸花", price: 500 },
      ],
    },
    quotation: {
      vendor: "大姐花艺",
      items: [
        { id: 1, name: "主舞台花艺", price: 12000 },
        { id: 2, name: "T台路引", price: 8000 },
        { id: 3, name: "手捧花", price: 1300 },
        { id: 4, name: "胸花", price: 500 },
      ],
    },
    execution: null,
  },
  themeCustom: {
    category: "主题定制",
    icon: <Crown className="h-5 w-5 text-amber-500" />,
    budget: 12000,
    quote: 12500,
    actual: null,
    plan: {
      vendor: "主题定制工坊",
      items: [
        { id: 1, name: "主题背景制作", price: 6000 },
        { id: 2, name: "定制道具", price: 4000 },
        { id: 3, name: "装饰品定制", price: 2000 },
      ],
    },
    quotation: {
      vendor: "主题定制工坊",
      items: [
        { id: 1, name: "主题背景制作", price: 6500 },
        { id: 2, name: "定制道具", price: 4000 },
        { id: 3, name: "装饰品定制", price: 2000 },
      ],
    },
    execution: null,
  },
  basicExpense: {
    category: "基础开销",
    icon: <Receipt className="h-5 w-5 text-blue-500" />,
    budget: 3000,
    quote: 3000,
    actual: null,
    plan: {
      vendor: "各类供应商",
      items: [
        { id: 1, name: "交通费", price: 800 },
        { id: 2, name: "餐饮费", price: 1200 },
        { id: 3, name: "其他杂费", price: 1000 },
      ],
    },
    quotation: {
      vendor: "各类供应商",
      items: [
        { id: 1, name: "交通费", price: 800 },
        { id: 2, name: "餐饮费", price: 1200 },
        { id: 3, name: "其他杂费", price: 1000 },
      ],
    },
    execution: null,
  },
  basicCosts: {
    category: "基础成本",
    icon: <Wrench className="h-5 w-5 text-gray-500" />,
    budget: 5000,
    quote: 5000,
    actual: 4800,
    plan: {
      vendor: "公司内部",
      items: [{ id: 1, name: "策划服务费", price: 5000 }],
    },
    quotation: {
      vendor: "公司内部",
      items: [{ id: 1, name: "策划服务费", price: 5000 }],
    },
    execution: {
      vendor: "公司内部",
      items: [
        { id: 1, name: "策划服务费", price: 5000 },
        { id: 2, name: "折扣", price: -200 },
      ],
    },
  },
  feeItems: {
    category: "费用项",
    icon: <DollarSign className="h-5 w-5 text-green-500" />,
    budget: 2000,
    quote: 2000,
    actual: null,
    plan: {
      vendor: "综合费用",
      items: [
        { id: 1, name: "管理费", price: 1000 },
        { id: 2, name: "服务费", price: 1000 },
      ],
    },
    quotation: {
      vendor: "综合费用",
      items: [
        { id: 1, name: "管理费", price: 1000 },
        { id: 2, name: "服务费", price: 1000 },
      ],
    },
    execution: null,
  },
  logistics: {
    category: "货车人工",
    icon: <Truck className="h-5 w-5 text-orange-500" />,
    budget: 1500,
    quote: 1600,
    actual: null,
    plan: {
      vendor: "物流公司",
      items: [
        { id: 1, name: "货车租赁", price: 800 },
        { id: 2, name: "搬运人工", price: 700 },
      ],
    },
    quotation: {
      vendor: "物流公司",
      items: [
        { id: 1, name: "货车租赁", price: 900 },
        { id: 2, name: "搬运人工", price: 700 },
      ],
    },
    execution: null,
  },
}

// --- REUSABLE COMPONENTS ---

const CostCategoryHeader = ({
  icon,
  title,
  budget,
  quote,
  actual,
}: { icon: ReactNode; title: string; budget: number; quote: number | null; actual: number | null }) => {
  const budgetQuoteDiff = quote !== null ? quote - budget : 0
  const quoteActualDiff = quote !== null && actual !== null ? actual - quote : 0
  const budgetActualDiff = actual !== null ? actual - budget : 0

  const getStatusBadge = () => {
    if (actual === null) {
      return quote !== null ? 
        <Badge variant="secondary">已报单</Badge> : 
        <Badge variant="outline">预算中</Badge>
    }
    
    if (quote !== null && Math.abs(quoteActualDiff) <= 100) {
      return <Badge variant="default" className="bg-green-500">报核一致</Badge>
    }
    
    if (quote !== null && Math.abs(quoteActualDiff) > 100) {
      return <Badge variant="destructive" className="bg-red-500">需要追查</Badge>
    }
    
    return <Badge variant="secondary">已核算</Badge>
  }

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-lg font-semibold">{title}</span>
        {getStatusBadge()}
      </div>
      <div className="flex items-center gap-4 text-sm">
        <div className="text-right">
          <p className="text-muted-foreground">预算</p>
          <p className="font-semibold">¥{budget.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">报单</p>
          {quote !== null ? (
            <p className={`font-semibold ${Math.abs(budgetQuoteDiff) > 100 ? "text-orange-500" : "text-blue-600"}`}>
              ¥{quote.toLocaleString()}
            </p>
          ) : (
            <p className="font-semibold text-muted-foreground">--</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">核算</p>
          {actual !== null ? (
            <p className={`font-semibold ${quote !== null && Math.abs(quoteActualDiff) > 100 ? "text-red-500" : "text-green-600"}`}>
              ¥{actual.toLocaleString()}
            </p>
          ) : (
            <p className="font-semibold text-muted-foreground">--</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">状态</p>
          {quote !== null && actual !== null ? (
            <div className="flex items-center gap-1">
              {Math.abs(quoteActualDiff) > 100 && <AlertTriangle className="h-3 w-3 text-red-500" />}
              <span className={`font-semibold text-xs ${Math.abs(quoteActualDiff) > 100 ? "text-red-500" : "text-green-600"}`}>
                {Math.abs(quoteActualDiff) > 100 ? "需追查" : "正常"}
              </span>
            </div>
          ) : (
            <p className="font-semibold text-muted-foreground text-xs">待完成</p>
          )}
        </div>
      </div>
    </div>
  )
}

const ReconciliationCard = ({ data, type }: { data: any; type: "lighting" | "floral" | "basic" | "design" | "theme" | "expense" | "fee" | "logistics" }) => {
  const renderForm = () => {
    if (!data.execution) {
      return (
        <div className="text-center py-12 border-2 border-dashed rounded-lg flex flex-col items-center justify-center h-full">
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground mb-4">待策划师上传核对单</p>
          <Button>上传核对单</Button>
        </div>
      )
    }

    if (type === "lighting") {
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Input defaultValue={data.execution.vendor} readOnly className="max-w-xs bg-white" />
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              上传单据
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>项目</TableHead>
                <TableHead className="w-24 text-center">实际数量</TableHead>
                <TableHead className="w-28 text-right">单价</TableHead>
                <TableHead className="w-32 text-right">小计</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.execution.items.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Input type="number" defaultValue={item.qty} className="text-center bg-white" />
                  </TableCell>
                  <TableCell className="text-right">¥{item.unitPrice.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-semibold">
                    ¥{(item.qty * item.unitPrice).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    }

    // Default/Floral/Basic form
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Input defaultValue={data.execution.vendor} readOnly className="max-w-xs bg-white" />
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            上传单据
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>项目</TableHead>
              <TableHead className="w-40 text-right">实际金额</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.execution.items.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Input defaultValue={item.name} className="bg-white" />
                </TableCell>
                <TableCell>
                  <Input type="number" defaultValue={item.price} className="text-right bg-white" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  const planTotal = data.plan.items.reduce(
    (sum: number, item: any) => sum + (item.price || item.qty * item.unitPrice),
    0,
  )

  return (
    <Card>
      <AccordionItem value={data.category}>
        <AccordionTrigger className="p-4 hover:no-underline">
          <CostCategoryHeader title={data.category} icon={data.icon} budget={data.budget} quote={data.quote} actual={data.actual} />
        </AccordionTrigger>
        <AccordionContent className="p-4 pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* --- Plan Column --- */}
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">预算 (Budget)</h3>
              <p className="text-sm mb-4 text-muted-foreground">供应商: {data.plan.vendor}</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">项目</TableHead>
                    <TableHead className="text-right text-xs">金额</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.plan.items.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-xs">{item.name}</TableCell>
                      <TableCell className="text-right text-xs">
                        ¥{(item.price || item.qty * item.unitPrice).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between font-bold text-sm mt-2 pt-2 border-t border-blue-200">
                <span>预算合计</span>
                <span>¥{planTotal.toLocaleString()}</span>
              </div>
            </div>
            
            {/* --- Quotation Column --- */}
            <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
              <h3 className="font-semibold mb-2 text-orange-700 dark:text-orange-300">报单 (Quote)</h3>
              <p className="text-sm mb-4 text-muted-foreground">供应商: {data.quotation?.vendor || "--"}</p>
              {data.quotation ? (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs">项目</TableHead>
                        <TableHead className="text-right text-xs">金额</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.quotation.items.map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell className="text-xs">{item.name}</TableCell>
                          <TableCell className="text-right text-xs">
                            ¥{(item.price || item.qty * item.unitPrice).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex justify-between font-bold text-sm mt-2 pt-2 border-t border-orange-200">
                    <span>报单合计</span>
                    <span>¥{data.quote?.toLocaleString()}</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-orange-200 rounded-lg">
                  <p className="text-muted-foreground mb-2 text-sm">待上传报单</p>
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    上传报单
                  </Button>
                </div>
              )}
            </div>
            
            {/* --- Execution Column --- */}
            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold mb-2 text-green-700 dark:text-green-300">核算 (Actual)</h3>
              {renderForm()}
              <div className="flex justify-between items-center mt-4">
                <Button variant="ghost" size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  添加项目
                </Button>
                {data.execution && (
                  <div className="flex justify-between font-bold text-sm">
                    <span>核算合计</span>
                    <span className="ml-4">¥{data.actual?.toLocaleString() ?? "0"}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Card>
  )
}

// --- MAIN PAGE COMPONENT ---

export default function CostReconciliationPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">成本核对</h1>
          <p className="text-muted-foreground">订单编号: VN-2026002 (邓超&孙俪)</p>
        </header>

        <Tabs defaultValue="post-wedding">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto md:mx-0">
            <TabsTrigger value="budget">预算计划</TabsTrigger>
            <TabsTrigger value="quotation">报单管理</TabsTrigger>
            <TabsTrigger value="post-wedding">核算对账</TabsTrigger>
          </TabsList>

          <TabsContent value="budget" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>预算计划</CardTitle>
                <CardDescription>初期成本预算规划，为后续报单和核算提供基准。</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>成本类别</TableHead>
                      <TableHead>供应商</TableHead>
                      <TableHead className="text-right">预算金额</TableHead>
                      <TableHead>备注</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.values(reconciliationData).map((data) => (
                      <TableRow key={data.category}>
                        <TableCell className="font-medium flex items-center gap-3">
                          {data.icon}
                          {data.category}
                        </TableCell>
                        <TableCell>{data.plan.vendor}</TableCell>
                        <TableCell className="text-right font-semibold text-lg">¥{data.budget.toLocaleString()}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {data.plan.items.length} 项明细
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-blue-50 dark:bg-blue-950/20 font-bold text-lg">
                      <TableCell colSpan={2} className="text-right">预算总计</TableCell>
                      <TableCell className="text-right text-blue-600">
                        ¥{Object.values(reconciliationData).reduce((sum, data) => sum + data.budget, 0).toLocaleString()}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quotation" className="mt-6">
            <div className="space-y-6">
              {Object.values(reconciliationData).map((data) => (
                <Card key={data.category} className="relative">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {data.icon}
                        <CardTitle className="text-xl">{data.category}</CardTitle>
                        {data.quotation ? 
                          <Badge variant="default" className="bg-orange-500">已报单</Badge> : 
                          <Badge variant="outline">待报单</Badge>
                        }
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        预算参考: ¥{data.budget.toLocaleString()}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                                         {data.quotation ? (
                       <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                         {/* 主要报单信息区域 */}
                         <div className="lg:col-span-3 bg-orange-50 dark:bg-orange-950/20 p-6 rounded-lg border-2 border-orange-200">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300">供应商报单</h3>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">供应商</p>
                              <p className="font-semibold">{data.quotation.vendor}</p>
                            </div>
                          </div>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                                                 <TableHead>项目名称</TableHead>
                                 {data.category === "灯光舞美" ? (
                                   <>
                                     <TableHead className="text-center w-20">数量</TableHead>
                                     <TableHead className="text-right w-24">单价</TableHead>
                                   </>
                                 ) : null}
                                 <TableHead className="text-right w-32">金额</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {data.quotation.items.map((item: any) => (
                                <TableRow key={item.id}>
                                  <TableCell className="font-medium">{item.name}</TableCell>
                                                                     {data.category === "灯光舞美" ? (
                                     <>
                                       <TableCell className="text-center">{item.qty}</TableCell>
                                       <TableCell className="text-right">¥{item.unitPrice.toLocaleString()}</TableCell>
                                     </>
                                   ) : null}
                                  <TableCell className="text-right font-semibold">
                                    ¥{(item.price || item.qty * item.unitPrice).toLocaleString()}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          <div className="flex justify-between items-center mt-4 pt-4 border-t border-orange-200">
                            <span className="text-lg font-bold text-orange-700">报单总计</span>
                            <span className="text-xl font-bold text-orange-700">¥{data.quote?.toLocaleString()}</span>
                          </div>
                        </div>
                        
                                                 {/* 预算对比参考区域 */}
                         <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border">
                                                     <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-300 text-sm">预算明细对比</h4>
                           <div className="space-y-3 max-h-96 overflow-y-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="text-xs p-2">项目</TableHead>
                                  <TableHead className="text-right text-xs p-2">预算</TableHead>
                                  <TableHead className="text-right text-xs p-2">报单</TableHead>
                                  <TableHead className="text-center text-xs p-2">差异</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                                                 {data.plan.items.map((planItem: any, index: number) => {
                                   const quoteItem = data.quotation?.items[index]
                                   const planAmount = (planItem as any).price || ((planItem as any).qty && (planItem as any).unitPrice ? (planItem as any).qty * (planItem as any).unitPrice : 0)
                                   const quoteAmount = quoteItem ? ((quoteItem as any).price || ((quoteItem as any).qty && (quoteItem as any).unitPrice ? (quoteItem as any).qty * (quoteItem as any).unitPrice : 0)) : 0
                                   const diff = quoteAmount - planAmount
                                  
                                  return (
                                    <TableRow key={planItem.id} className="text-xs">
                                      <TableCell className="p-2 font-medium">{planItem.name}</TableCell>
                                      <TableCell className="text-right p-2">¥{planAmount.toLocaleString()}</TableCell>
                                      <TableCell className="text-right p-2">
                                        {quoteItem ? `¥${quoteAmount.toLocaleString()}` : "--"}
                                      </TableCell>
                                      <TableCell className="text-center p-2">
                                        {quoteItem ? (
                                          <span className={`font-semibold ${diff > 0 ? "text-red-500" : diff < 0 ? "text-green-600" : "text-gray-500"}`}>
                                            {diff === 0 ? "=" : (diff > 0 ? "+" : "")}
                                            {diff !== 0 ? `¥${diff.toLocaleString()}` : ""}
                                          </span>
                                        ) : (
                                          <span className="text-muted-foreground">--</span>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>
                            </Table>
                            <hr className="my-2" />
                            <div className="flex justify-between text-sm font-semibold">
                              <span>总计差异</span>
                              <span className={`${(data.quote || 0) - data.budget > 0 ? "text-red-500" : "text-green-600"}`}>
                                {(data.quote || 0) - data.budget > 0 ? "+" : ""}¥{((data.quote || 0) - data.budget).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 border-2 border-dashed border-orange-200 rounded-lg bg-orange-50/50">
                        <div className="mb-4">
                          <Upload className="h-12 w-12 text-orange-400 mx-auto mb-2" />
                          <p className="text-lg font-semibold text-orange-700 mb-1">待上传报单</p>
                          <p className="text-sm text-muted-foreground">预算金额: ¥{data.budget.toLocaleString()}</p>
                        </div>
                        <Button className="bg-orange-500 hover:bg-orange-600">
                          <Upload className="h-4 w-4 mr-2" />
                          上传报单
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="post-wedding" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight">核算对账</h2>
              <p className="text-muted-foreground">婚礼执行后的实际成本核算，重点填写核算信息。</p>
            </div>
            
            <div className="space-y-6">
              {Object.values(reconciliationData).map((data) => (
                <Card key={data.category} className="relative">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {data.icon}
                        <CardTitle className="text-xl">{data.category}</CardTitle>
                        {data.execution ? (
                          data.quote !== null && Math.abs((data.actual || 0) - data.quote) <= 100 ?
                            <Badge variant="default" className="bg-green-500">报核一致</Badge> :
                            <Badge variant="destructive">需要追查</Badge>
                        ) : (
                          <Badge variant="outline">待核算</Badge>
                        )}
                      </div>
                      <div className="flex gap-6 text-sm text-muted-foreground">
                        <div className="text-right">
                          <p>预算: ¥{data.budget.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p>报单: {data.quote ? `¥${data.quote.toLocaleString()}` : "--"}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                                         <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                       {/* 主要核算填写区域 */}
                       <div className="lg:col-span-3 bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border-2 border-green-200">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">实际核算</h3>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            上传单据
                          </Button>
                        </div>
                        
                        {data.execution ? (
                          <>
                            <div className="mb-4">
                              <Input 
                                defaultValue={data.execution.vendor} 
                                placeholder="供应商名称" 
                                className="max-w-xs bg-white"
                              />
                            </div>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                                                     <TableHead>项目名称</TableHead>
                                   {data.category === "灯光舞美" ? (
                                     <>
                                       <TableHead className="text-center w-24">实际数量</TableHead>
                                       <TableHead className="text-right w-28">单价</TableHead>
                                     </>
                                   ) : null}
                                   <TableHead className="text-right w-32">实际金额</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {data.execution.items.map((item: any) => (
                                  <TableRow key={item.id}>
                                    <TableCell>
                                      <Input defaultValue={item.name} className="bg-white" />
                                    </TableCell>
                                                                         {data.category === "灯光舞美" ? (
                                       <>
                                         <TableCell>
                                           <Input 
                                             type="number" 
                                             defaultValue={item.qty} 
                                             className="text-center bg-white w-20" 
                                           />
                                         </TableCell>
                                         <TableCell>
                                           <Input 
                                             type="number" 
                                             defaultValue={item.unitPrice} 
                                             className="text-right bg-white" 
                                           />
                                         </TableCell>
                                       </>
                                     ) : null}
                                    <TableCell>
                                      <Input 
                                        type="number" 
                                        defaultValue={item.price || item.qty * item.unitPrice} 
                                        className="text-right bg-white font-semibold" 
                                      />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-green-200">
                              <Button variant="ghost" size="sm">
                                <PlusCircle className="h-4 w-4 mr-2" />
                                添加项目
                              </Button>
                              <div className="flex items-center gap-4">
                                <span className="text-lg font-bold text-green-700">核算总计</span>
                                <span className="text-xl font-bold text-green-700">¥{data.actual?.toLocaleString()}</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-12 border-2 border-dashed border-green-200 rounded-lg">
                            <Upload className="h-12 w-12 text-green-400 mx-auto mb-4" />
                            <p className="text-lg font-semibold text-green-700 mb-2">待上传核算单</p>
                            <p className="text-sm text-muted-foreground mb-4">请上传实际成本核算单据</p>
                            <Button className="bg-green-500 hover:bg-green-600">
                              <Upload className="h-4 w-4 mr-2" />
                              上传核算单
                            </Button>
                          </div>
                        )}
                      </div>
                      
                                             {/* 对比参考区域 */}
                       <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border">
                                                   <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-300 text-sm">三方明细对比</h4>
                          <div className="space-y-3 max-h-96 overflow-y-auto">
                           <Table>
                             <TableHeader>
                               <TableRow>
                                 <TableHead className="text-xs p-1">项目</TableHead>
                                 <TableHead className="text-right text-xs p-1">预算</TableHead>
                                 <TableHead className="text-right text-xs p-1">报单</TableHead>
                                 <TableHead className="text-right text-xs p-1">核算</TableHead>
                                 <TableHead className="text-center text-xs p-1">状态</TableHead>
                               </TableRow>
                             </TableHeader>
                             <TableBody>
                               {data.plan.items.map((planItem: any, index: number) => {
                                 const quoteItem = data.quotation?.items[index]
                                 const actualItem = data.execution?.items[index]
                                 
                                 const planAmount = (planItem as any).price || ((planItem as any).qty && (planItem as any).unitPrice ? (planItem as any).qty * (planItem as any).unitPrice : 0)
                                 const quoteAmount = quoteItem ? ((quoteItem as any).price || ((quoteItem as any).qty && (quoteItem as any).unitPrice ? (quoteItem as any).qty * (quoteItem as any).unitPrice : 0)) : null
                                 const actualAmount = actualItem ? ((actualItem as any).price || ((actualItem as any).qty && (actualItem as any).unitPrice ? (actualItem as any).qty * (actualItem as any).unitPrice : 0)) : null
                                 
                                 const quoteDiff = quoteAmount !== null ? quoteAmount - planAmount : null
                                 const actualDiff = actualAmount !== null && quoteAmount !== null ? actualAmount - quoteAmount : null
                                 
                                 return (
                                   <TableRow key={planItem.id} className="text-xs">
                                     <TableCell className="p-1 font-medium">{planItem.name}</TableCell>
                                     <TableCell className="text-right p-1">¥{planAmount.toLocaleString()}</TableCell>
                                     <TableCell className="text-right p-1">
                                       {quoteAmount !== null ? `¥${quoteAmount.toLocaleString()}` : "--"}
                                     </TableCell>
                                     <TableCell className="text-right p-1 font-semibold">
                                       {actualAmount !== null ? `¥${actualAmount.toLocaleString()}` : "--"}
                                     </TableCell>
                                     <TableCell className="text-center p-1">
                                       {actualAmount !== null && quoteAmount !== null ? (
                                         Math.abs(actualDiff!) <= 50 ? (
                                           <span className="text-green-600 text-xs">✓</span>
                                         ) : (
                                           <span className="text-red-500 text-xs">⚠</span>
                                         )
                                       ) : (
                                         <span className="text-muted-foreground text-xs">--</span>
                                       )}
                                     </TableCell>
                                   </TableRow>
                                 )
                               })}
                             </TableBody>
                           </Table>
                           <hr className="my-2" />
                           <div className="space-y-1">
                             <div className="flex justify-between text-xs">
                               <span>预算总计</span>
                               <span>¥{data.budget.toLocaleString()}</span>
                             </div>
                             <div className="flex justify-between text-xs">
                               <span>报单总计</span>
                               <span>{data.quote ? `¥${data.quote.toLocaleString()}` : "--"}</span>
                             </div>
                             <div className="flex justify-between text-xs font-semibold">
                               <span>核算总计</span>
                               <span>{data.actual ? `¥${data.actual.toLocaleString()}` : "--"}</span>
                             </div>
                             {data.quote && data.actual && (
                               <div className="pt-2 border-t">
                                 <div className="flex justify-between text-xs">
                                   <span>报核差异</span>
                                   <span className={`font-semibold ${Math.abs(data.actual - data.quote) > 100 ? "text-red-500" : "text-green-600"}`}>
                                     {data.actual - data.quote > 0 ? "+" : ""}¥{(data.actual - data.quote).toLocaleString()}
                                   </span>
                                 </div>
                                 {Math.abs(data.actual - data.quote) > 100 && (
                                   <div className="flex items-center gap-1 mt-1">
                                     <AlertTriangle className="h-3 w-3 text-red-500" />
                                     <span className="text-xs text-red-500">需要追查原因</span>
                                   </div>
                                 )}
                               </div>
                             )}
                           </div>
                         </div>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
