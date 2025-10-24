using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FGB.Dominio.Interfaces
{
    public interface IDto<T>
    {
        void MapFrom(T entity);
    }

}
