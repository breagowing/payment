import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">项目主页</h1>
        <p className="text-muted-foreground mb-8">请选择要预览的页面</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/cost-reconciliation">成本核对页面</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/income-settlement">收入结算单抽屉</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
