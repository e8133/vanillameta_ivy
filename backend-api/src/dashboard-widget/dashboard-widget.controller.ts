import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DashboardWidgetService } from './dashboard-widget.service';
import { CreateDashboardWidgetDto } from './dto/create-dashboard-widget.dto';
import { UpdateDashboardWidgetDto } from './dto/update-dashboard-widget.dto';

@Controller('dashboard-widget')
export class DashboardWidgetController {
  constructor(private readonly dashboardWidgetService: DashboardWidgetService) {}

  @Post()
  create(@Body() createDashboardWidgetDto: CreateDashboardWidgetDto) {
    return this.dashboardWidgetService.create(createDashboardWidgetDto);
  }

  @Get()
  findAll() {
    return this.dashboardWidgetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardWidgetService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDashboardWidgetDto: UpdateDashboardWidgetDto) {
    return this.dashboardWidgetService.update(+id, updateDashboardWidgetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.dashboardWidgetService.remove(+id);
  }
}