"use client";

import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
	const pathname = usePathname();

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => {
					const isParentActive = item.items?.some(
						(sub) => pathname === sub.url
					);

					return (
						<Collapsible
							key={item.title}
							asChild
							defaultOpen={isParentActive || item.isActive}
							className='group/collapsible'
						>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<SidebarMenuButton
										tooltip={item.title}
										className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
											isParentActive
												? "bg-muted text-primary font-semibold"
												: "hover:bg-muted"
										}`}
									>
										{item.icon && <item.icon className='w-4 h-4' />}
										<span>{item.title}</span>
										<ChevronRight className='ml-auto w-4 h-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
									</SidebarMenuButton>
								</CollapsibleTrigger>

								<CollapsibleContent>
									<SidebarMenuSub>
										{item.items?.map((subItem) => {
											const isActive = pathname === subItem.url;
											return (
												<SidebarMenuSubItem key={subItem.title}>
													<SidebarMenuSubButton
														asChild
														className={`rounded-md px-3 py-2 text-sm transition-colors ${
															isActive
																? "bg-muted text-primary font-semibold"
																: "hover:bg-muted"
														}`}
													>
														<a
															href={subItem.url}
															className='flex items-center gap-2'
														>
															{subItem.icon && (
																<subItem.icon className='w-4 h-4 text-muted-foreground' />
															)}
															<span>{subItem.title}</span>
														</a>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											);
										})}
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
