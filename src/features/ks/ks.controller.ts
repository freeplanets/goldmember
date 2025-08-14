import { Body, Controller, Delete, Get, Headers, HttpCode, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { KsService } from "./ks.service";
import { ImportKsMemberDto } from "../dto/import_ks_member.dto";
import { ApiExcludeEndpoint, ApiHeader, ApiParam } from "@nestjs/swagger";
import EncDecString from "../../function/EncDecString";

@Controller('ks')
export class KsController {
    constructor(private readonly ksService: KsService){}

    @Post('membersimport')
    @ApiHeader({name: 'X-Api-Key', description: 'Api key'})
    @HttpCode(204)
    async createMember(@Body() dto:ImportKsMemberDto, @Headers('X-Api-Key') apiKey:string){
        try {
            const eds:EncDecString = new EncDecString(process.env.KS_API_KEY);
            const { siteid } = JSON.parse(eds.Decrypted(apiKey));
            if (siteid) {
                await this.ksService.importDatas(dto);
                return;
            } else {
                console.log("api key error:", apiKey);
                throw new HttpException('Forbiden', HttpStatus.FORBIDDEN);
            }
        } catch(err) {
            console.log(err);
            throw new HttpException('Forbiden', HttpStatus.FORBIDDEN);
        }

    }

    @Get('list/:opt')
    @ApiExcludeEndpoint(true)
    @ApiParam({name: 'opt', description: '查詢選項'})
    @ApiHeader({name: 'X-Api-Key', description: 'Api key'})
    getAll(@Headers('X-Api-Key') apiKey:string, @Param('opt') opt:string) {
        console.log('apiKey', apiKey);
        const eds:EncDecString = new EncDecString(process.env.KS_API_KEY);
        const { siteid } = JSON.parse(eds.Decrypted(apiKey));
        if (siteid) {        
            return this.ksService.getAll(opt);
        } else {
            return "";
        }
    }

    @Get('find/:id')
    //@ApiExcludeEndpoint(true)
    // @ApiParam({name: 'id', description: '資料主鍵'})
    // @ApiHeader({name: 'X-Api-Key', description: 'Api key'})
    async getOne(@Headers('X-Api-Key') apiKey:string, @Param('id') id:string) {
        const eds:EncDecString = new EncDecString(process.env.KS_API_KEY);
        const { siteid } = JSON.parse(eds.Decrypted(apiKey));
        if (siteid) {        
            const itm = await this.ksService.getOneById(id);
            console.log('item:', itm);
            return itm;
        } else {
            return "";
        }        
    }

    @Delete('delData/:id')
    @ApiExcludeEndpoint(true)
    // @ApiParam({name: 'id', description: '資料主鍵'}) 
    // @ApiHeader({name: 'X-Api-Key', description: 'Api key'})
    delAll(@Headers('X-Api-Key') apiKey:string, @Param('id') id:string) {
        const eds:EncDecString = new EncDecString(process.env.KS_API_KEY);
        const { siteid } = JSON.parse(eds.Decrypted(apiKey));
        if (siteid) {        
            return this.ksService.delOne(id);
        } else {
            return "";
        }
    }
    @Get('log/:count')
    @ApiExcludeEndpoint(true)
    //@ApiParam({name: 'count', description:"傳送筆數大於等於count"})
    //@ApiHeader({name: 'X-Api-Key', description: 'Api key'})
    getLog(@Headers('X-Api-Key') apiKey:string, @Param('count') count:string) {
        const eds:EncDecString = new EncDecString(process.env.KS_API_KEY);
        const { siteid } = JSON.parse(eds.Decrypted(apiKey));
        if (siteid) {        
            return this.ksService.getLog(Number(count));
        } else {
            return "";
        }
    }
    @Delete('delLog/:id')
    @ApiExcludeEndpoint(true)
    // @ApiParam({name: 'id', description: '資料主鍵'}) 
    // @ApiHeader({name: 'X-Api-Key', description: 'Api key'})
    delLog(@Headers('X-Api-Key') apiKey:string, @Param('id') id:string) {
        const eds:EncDecString = new EncDecString(process.env.KS_API_KEY);
        const { siteid } = JSON.parse(eds.Decrypted(apiKey));
        if (siteid) {        
            return this.ksService.delLog(id);
        } else {
            return "";
        }
    }
    
    @Get('invitationcode')
    @ApiExcludeEndpoint(true)
    async getCode() {
        return this.ksService.createCodeData();
    }
}