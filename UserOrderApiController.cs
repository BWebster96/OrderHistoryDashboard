using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/userorders")]
    [ApiController]
    public class UserOrderApiController : BaseApiController
    {
        private IUserOrderService _service = null;
        private IAuthenticationService<int> _authService = null;
        public UserOrderApiController(IUserOrderService service
            , ILogger<UserOrderApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<ItemResponse<Paged<UserOrders>>>
            GetUserOrders(int pageIndex, int pageSize)
        {
            int currentId = _authService.GetCurrentUserId();
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<UserOrders> pagedList = _service.GetByUserId(currentId, pageIndex, pageSize);

                if (pagedList == null)
                {
                    code = 404;
                    response = new ErrorResponse("User Orders Records Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<UserOrders>> { Item = pagedList };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);

        }
    }
}
