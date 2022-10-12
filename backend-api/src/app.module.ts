import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DatabaseModule} from './database/database.module';
import {DatasetModule} from './dataset/dataset.module';
import {WidgetModule} from './widget/widget.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {TemplateModule} from './template/template.module';
import {CommonModule} from './common/common.module';
import {ComponentModule} from './component/component.module';
import {WidgetViewModule} from './widget-view/widget-view.module';
import { DashboardWidgetModule } from './dashboard-widget/dashboard-widget.module';
import { initOracleClient } from 'oracledb';
// import * as oracledb from 'oracledb';
//
// oracledb.initOracleClient({libDir: '/Users/frog/Downloads/instantclient_19_8'});



@Module({

    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV == 'dev' ? '.env.dev' : '.env.prod',
        }),
        // TypeOrmModule.forRoot({
        //     type: 'mysql',
        //     host: process.env.DB_HOST,
        //     port: parseInt(process.env.DB_PORT) || 3306,
        //     username: process.env.DB_USERNAME,
        //     password: process.env.DB_PASSWORD,
        //     database: process.env.DB_NAME,
        //     // type: 'sqlite',
        //     // database: 'vanillameta',
        //     autoLoadEntities: true,
        //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
        //     synchronize: false,
        //     logging: process.env.NODE_ENV == 'dev',
        //     retryAttempts: 1,
        // }),
        TypeOrmModule.forRoot({

            type: 'oracle',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT) || 3306,
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            autoLoadEntities: true,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: false,
            logging: process.env.NODE_ENV == 'dev',
            retryAttempts: 1,

        }),
        DatabaseModule,
        DatasetModule,
        WidgetModule,
        DashboardModule,
        TemplateModule,
        CommonModule,
        ComponentModule,
        WidgetViewModule,
        DashboardWidgetModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
