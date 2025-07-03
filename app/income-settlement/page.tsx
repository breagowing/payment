"use client"

import type * as React from "react"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Printer, Copy, FileText, Wallet, Ban, MessageSquare } from "lucide-react"

const settlementData = {
  id: "XS20250701001",
  status: "待收款",
  customer: {
    name: "张杰 & 谢娜",
    id: "VN-2025088",
    date: "2025-07-01",
    salesperson: "小熊",
    planner: "北北",
    venue: "天空之城君澜酒店",
  },
  balance: 28000.0,
  serviceItems: [
    {
      id: 1,
      name: "婚礼策划服务",
      description: "全套服务",
      quantity: 1,
      unitPrice: 78000.0,
      taxRate: 0.0,
      taxAmount: 0.0,
      total: 78000.0,
      remarks: "",
    },
  ],
  summary: {
    subtotal: 78000.0,
    tax: 0.0,
    totalAmount: 78000.0,
  },
  receivedPayments: [
    {
      id: "SK202507010002",
      date: "2025-07-01",
      type: "业务收款",
      amount: 30000.0,
      remarks: "--",
    },
    {
      id: "SK202507010001",
      date: "2025-07-01",
      type: "业务收款",
      amount: 20000.0,
      remarks: "--",
    },
  ],
  pendingPayments: [
    {
      id: "SKTB202507010003",
      date: "2025-07-01",
      amount: 10000.0,
      remarks: "",
    },
  ],
  details: {
    paymentTerm: "2025-07-01",
    account: "默认账户",
    contract: "--",
    salesSlip: "--",
    notes: "--",
  },
  history: [
    {
      user: "小熊",
      avatar: "小熊",
      action: "提交(无需审批)",
      timestamp: "2025-07-01 14:37",
    },
    {
      user: "出纳",
      avatar: "出纳",
      action: "待收款",
      timestamp: "2025-07-01 14:37",
    },
    {
      user: "小熊",
      avatar: "小熊",
      action: "收款",
      amount: 20000,
      timestamp: "2025-07-01 14:40",
    },
    {
      user: "小熊",
      avatar: "小熊",
      action: "收款",
      amount: 30000,
      timestamp: "2025-07-01 16:15",
    },
  ],
}

const DetailItem = ({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
)

function IncomeSettlementDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const totalReceived = settlementData.receivedPayments.reduce((sum, p) => sum + p.amount, 0)
  const totalPending = settlementData.pendingPayments.reduce((sum, p) => sum + p.amount, 0)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-5xl flex flex-col h-full p-0">
        {/* Header */}
        <SheetHeader className="p-4 border-b dark:border-gray-800">
          <div className="flex items-center gap-4">
            <SheetTitle className="text-xl font-semibold">收入结算 {settlementData.id}</SheetTitle>
            <Badge variant="outline" className="text-orange-500 border-orange-500">
              {settlementData.status}
            </Badge>
          </div>
        </SheetHeader>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto">
          <main className="p-6 space-y-6">
            {/* Customer Info */}
            <section>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold mb-4">{settlementData.customer.name}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-4">
                    <DetailItem label="日期" value={settlementData.customer.date} />
                    <DetailItem label="业务员" value={settlementData.customer.salesperson} />
                    <DetailItem label="策划师" value={settlementData.customer.planner} />
                    <DetailItem label="仪式场地" value={settlementData.customer.venue} />
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm text-muted-foreground">应收余额</p>
                  <p className="text-3xl font-bold">
                    {settlementData.balance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </section>

            {/* Service Items Table */}
            <section>
              <h2 className="text-lg font-semibold mb-4">项目明细</h2>
              <div className="border rounded-md">
                <Table>
                  <TableHeader className="bg-gray-50 dark:bg-gray-900">
                    <TableRow>
                      <TableHead className="w-[60px]">序号</TableHead>
                      <TableHead>项目名称</TableHead>
                      <TableHead>规格/说明</TableHead>
                      <TableHead className="text-center">数量</TableHead>
                      <TableHead className="text-right">单价</TableHead>
                      <TableHead className="text-right">税率/税额</TableHead>
                      <TableHead className="text-right">金额</TableHead>
                      <TableHead>备注</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {settlementData.serviceItems.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="text-muted-foreground">{item.description}</TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right">{item.unitPrice.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          {item.taxRate * 100}%
                          <br />
                          <span className="text-muted-foreground">{item.taxAmount.toFixed(2)}</span>
                        </TableCell>
                        <TableCell className="text-right font-semibold">{item.total.toFixed(2)}</TableCell>
                        <TableCell>{item.remarks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>

            {/* Table Footer & Summary */}
            <div className="flex justify-end items-center">
              <div className="w-64 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>金额小计</span>
                  <span>{settlementData.summary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>税额</span>
                  <span>{settlementData.summary.tax.toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-base">
                  <span>合计金额</span>
                  <span>{settlementData.summary.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Additional Info Tabs */}
            <section>
              <Tabs defaultValue="details">
                <div className="flex justify-between items-center border-b">
                  <TabsList>
                    <TabsTrigger value="details">详细信息</TabsTrigger>
                    <TabsTrigger value="attachments">附件(0)</TabsTrigger>
                  </TabsList>
                  <Button variant="link">会计凭证</Button>
                </div>
                <TabsContent value="details" className="pt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-4">
                    <DetailItem label="账期" value={settlementData.details.paymentTerm} />
                    <DetailItem label="收款账户" value={settlementData.details.account} />
                    <DetailItem label="关联合同" value={settlementData.details.contract} />
                    <DetailItem label="销货单" value={settlementData.details.salesSlip} />
                    <DetailItem
                      label="附言(不打印)"
                      value={
                        <Button variant="link" className="p-0 h-auto">
                          添加
                        </Button>
                      }
                    />
                    <DetailItem label="备注" value={settlementData.details.notes} />
                  </div>
                </TabsContent>
                <TabsContent value="attachments" className="pt-4">
                  <p>暂无附件</p>
                </TabsContent>
              </Tabs>
            </section>

            {/* Records Tabs */}
            <section>
              <Tabs defaultValue="payment">
                <div className="flex justify-between items-center border-b">
                  <TabsList>
                    <TabsTrigger value="payment">收款记录</TabsTrigger>
                    <TabsTrigger value="clearing">核销记录</TabsTrigger>
                    <TabsTrigger value="invoicing">开票记录</TabsTrigger>
                  </TabsList>
                  <Button variant="link">相关草稿</Button>
                </div>
                <TabsContent value="payment" className="pt-4 space-y-4">
                  <div>
                    <h3 className="font-semibold text-sm mb-2">已收款</h3>
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>日期</TableHead>
                            <TableHead>类型</TableHead>
                            <TableHead>业务单号</TableHead>
                            <TableHead className="text-right">金额</TableHead>
                            <TableHead>备注</TableHead>
                            <TableHead className="text-center">操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {settlementData.receivedPayments.map((p) => (
                            <TableRow key={p.id}>
                              <TableCell>{p.date}</TableCell>
                              <TableCell>{p.type}</TableCell>
                              <TableCell>
                                <Button variant="link" className="p-0 h-auto">
                                  {p.id}
                                </Button>
                              </TableCell>
                              <TableCell className="text-right">{p.amount.toFixed(2)}</TableCell>
                              <TableCell>{p.remarks}</TableCell>
                              <TableCell className="text-center">--</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="text-right text-sm mt-2 font-semibold">合计收款: {totalReceived.toFixed(2)}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-2">待确认</h3>
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>日期</TableHead>
                            <TableHead>业务单号</TableHead>
                            <TableHead className="text-right">金额</TableHead>
                            <TableHead>备注</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {settlementData.pendingPayments.map((p) => (
                            <TableRow key={p.id}>
                              <TableCell>{p.date}</TableCell>
                              <TableCell>
                                <Button variant="link" className="p-0 h-auto">
                                  {p.id}
                                </Button>
                              </TableCell>
                              <TableCell className="text-right">{p.amount.toFixed(2)}</TableCell>
                              <TableCell>{p.remarks}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="text-right text-sm mt-2 font-semibold">合计: {totalPending.toFixed(2)}</div>
                  </div>
                </TabsContent>
                <TabsContent value="clearing" className="pt-4">
                  <p>暂无核销记录</p>
                </TabsContent>
                <TabsContent value="invoicing" className="pt-4">
                  <p>暂无开票记录</p>
                </TabsContent>
              </Tabs>
            </section>

            {/* Operation History */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">操作历史</h2>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  评论
                </Button>
              </div>
              <div className="space-y-2">
                {settlementData.history.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback className="bg-blue-500 text-white">{item.avatar}</AvatarFallback>
                      </Avatar>
                      {index < settlementData.history.length - 1 && (
                        <div className="absolute top-full left-1/2 w-px h-10 bg-border -translate-x-1/2" />
                      )}
                    </div>
                    <div className="flex-1 flex justify-between items-start pt-1">
                      <div>
                        <p className="text-sm">
                          <span className="font-semibold">{item.user}</span>
                          <span className="text-muted-foreground"> ({item.action})</span>
                        </p>
                        {item.amount && (
                          <div className="mt-1 text-sm text-muted-foreground bg-gray-100 dark:bg-gray-800 rounded px-2 py-1 inline-block">
                            ¥{item.amount.toFixed(2)}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>

        {/* Footer */}
        <SheetFooter className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t dark:border-gray-800">
          <div className="flex items-center justify-end gap-2 w-full">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              开票
            </Button>
            <Button variant="outline">
              <Copy className="mr-2 h-4 w-4" />
              复制
            </Button>
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              打印
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Wallet className="mr-2 h-4 w-4" />
              收款
            </Button>
            <Button variant="outline">
              <Ban className="mr-2 h-4 w-4" />
              驳回
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default function IncomeSettlementPage() {
  const router = useRouter()

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back()
    }
  }

  return <IncomeSettlementDrawer open={true} onOpenChange={handleOpenChange} />
}
