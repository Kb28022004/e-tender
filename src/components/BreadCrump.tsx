import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadCrump = () => {
  return (
                <div className="mt-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Tender
                  </h1>

                  {/* Breadcrumb */}
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          href="/"
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Home
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <span className="text-gray-900 font-medium">
                          Tender
                        </span>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
  )
}

export default BreadCrump